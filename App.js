import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
} from 'react-native';

// ─── Theme ───────────────────────────────────────────────────────────────────

const C = {
  bg:         '#04080F',
  surface:    '#080E1C',
  card:       '#0C1322',
  blue:       '#3B82F6',
  blueDeep:   '#1D4ED8',
  blueDim:    'rgba(59,130,246,0.12)',
  blueGlow:   'rgba(59,130,246,0.25)',
  purple:     '#8B5CF6',
  purpleDim:  'rgba(139,92,246,0.12)',
  teal:       '#14B8A6',
  tealDim:    'rgba(20,184,166,0.12)',
  border:     'rgba(59,130,246,0.12)',
  borderHi:   'rgba(59,130,246,0.30)',
  text:       '#F1F5F9',
  mid:        '#94A3B8',
  muted:      '#475569',
  gold:       '#F59E0B',
};

// ─── Layout hook ─────────────────────────────────────────────────────────────

function useLayout() {
  const { width } = useWindowDimensions();
  return {
    isDesktop: width >= 1024,
    isTablet:  width >= 768,
    pad:       width >= 1024 ? 80 : width >= 768 ? 40 : 24,
  };
}

// ─── Shared components ───────────────────────────────────────────────────────

function Placeholder({ height = 200, label = 'Image', borderRadius = 16, style }) {
  return (
    <View style={[{
      width: '100%',
      height,
      backgroundColor: C.card,
      borderRadius,
      borderWidth: 1.5,
      borderColor: C.borderHi,
      borderStyle: 'dashed',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
    }, style]}>
      <View style={{
        width: 52, height: 52, borderRadius: 14,
        backgroundColor: C.blueDim,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Text style={{ fontSize: 26 }}>🖼</Text>
      </View>
      <Text style={{ color: C.blue, fontSize: 13, fontWeight: '700', textAlign: 'center', paddingHorizontal: 16 }}>
        {label}
      </Text>
      <Text style={{ color: C.muted, fontSize: 11 }}>DALL·E image placeholder</Text>
    </View>
  );
}

function AvatarPlaceholder({ size = 44, label }) {
  return (
    <View style={{
      width: size, height: size, borderRadius: size / 2,
      backgroundColor: C.blueDim,
      borderWidth: 1.5, borderColor: C.borderHi, borderStyle: 'dashed',
      alignItems: 'center', justifyContent: 'center',
    }}>
      <Text style={{ fontSize: size * 0.42 }}>👤</Text>
    </View>
  );
}

function Badge({ text, color = C.blue, dimColor = C.blueDim }) {
  return (
    <View style={{
      alignSelf: 'flex-start',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      borderRadius: 999,
      borderWidth: 1,
      borderColor: color + '55',
      backgroundColor: dimColor,
      paddingHorizontal: 14,
      paddingVertical: 6,
    }}>
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }} />
      <Text style={{ color, fontSize: 11, fontWeight: '700', letterSpacing: 0.8 }}>{text}</Text>
    </View>
  );
}

function Divider({ vertical = false }) {
  return (
    <View style={vertical
      ? { width: 1, alignSelf: 'stretch', backgroundColor: C.border }
      : { height: 1, backgroundColor: C.border }
    } />
  );
}

function CTAButton({ label, primary = false, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{
        borderRadius: 12,
        paddingHorizontal: 28,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        ...(primary
          ? { backgroundColor: C.blue }
          : { borderWidth: 1.5, borderColor: C.borderHi }),
      }, style]}
    >
      <Text style={{
        fontSize: 15, fontWeight: '700',
        color: primary ? '#fff' : C.mid,
      }}>{label}</Text>
    </TouchableOpacity>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────

function SectionHeading({ badge, title, subtitle, center = false, badgeColor, badgeDim }) {
  const { isDesktop } = useLayout();
  return (
    <View style={{ alignItems: center ? 'center' : 'flex-start', marginBottom: 52, gap: 14 }}>
      <Badge text={badge} color={badgeColor} dimColor={badgeDim} />
      <Text style={{
        color: C.text,
        fontSize: isDesktop ? 42 : 30,
        fontWeight: '800',
        lineHeight: isDesktop ? 52 : 40,
        letterSpacing: -0.8,
        textAlign: center ? 'center' : 'left',
        maxWidth: 620,
      }}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={{
          color: C.mid, fontSize: 17, lineHeight: 28,
          textAlign: center ? 'center' : 'left',
          maxWidth: 560,
        }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const { isDesktop, pad } = useLayout();
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: pad,
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderBottomColor: C.border,
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <View style={{
          width: 34, height: 34, borderRadius: 9,
          backgroundColor: C.blue,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '900' }}>S</Text>
        </View>
        <Text style={{ color: C.text, fontSize: 19, fontWeight: '800', letterSpacing: -0.3 }}>
          SmartBiz<Text style={{ color: C.blue }}>AI</Text>
        </Text>
      </View>

      {isDesktop && (
        <View style={{ flexDirection: 'row', gap: 36, alignItems: 'center' }}>
          {['Services', 'How It Works', 'Pricing', 'About'].map(item => (
            <TouchableOpacity key={item}>
              <Text style={{ color: C.mid, fontSize: 14, fontWeight: '500' }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <CTAButton label="Get Started Free" primary />
    </View>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero() {
  const { isDesktop, pad } = useLayout();
  return (
    <View style={{ paddingHorizontal: pad, paddingTop: 80, paddingBottom: 80 }}>
      <View style={{
        flexDirection: isDesktop ? 'row' : 'column',
        gap: 56,
        alignItems: 'center',
      }}>
        <View style={{ flex: isDesktop ? 1 : undefined, gap: 28, maxWidth: isDesktop ? 560 : undefined }}>
          <Badge text="AI-POWERED BUSINESS AUTOMATION" />

          <Text style={{
            color: C.text,
            fontSize: isDesktop ? 58 : 38,
            fontWeight: '900',
            lineHeight: isDesktop ? 68 : 48,
            letterSpacing: -1.2,
          }}>
            Automate Your{'\n'}
            <Text style={{ color: C.blue }}>Small Business</Text>
            {'\n'}with AI
          </Text>

          <Text style={{ color: C.mid, fontSize: 18, lineHeight: 30, maxWidth: 480 }}>
            Streamline sales, HR payroll, and accounting with intelligent automation built for small business owners — not enterprise IT departments.
          </Text>

          <View style={{ flexDirection: 'row', gap: 14, flexWrap: 'wrap' }}>
            <CTAButton label="Start Free Trial" primary />
            <CTAButton label="Watch Demo  →" />
          </View>

          <View style={{ flexDirection: 'row', gap: 24, flexWrap: 'wrap' }}>
            {['No credit card required', '500+ businesses served'].map((t, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ color: C.teal, fontSize: 14, fontWeight: '700' }}>✓</Text>
                <Text style={{ color: C.muted, fontSize: 13 }}>{t}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={{ flex: isDesktop ? 1 : undefined, width: '100%' }}>
          <Image
            source={require('./assets/hero.png')}
            style={{ width: '100%', height: 440, borderRadius: 22 }}
            resizeMode="cover"
          />
        </View>
      </View>
    </View>
  );
}

// ─── Stats banner ─────────────────────────────────────────────────────────────

function StatsBanner() {
  const { isDesktop, pad } = useLayout();
  const stats = [
    { value: '500+',  label: 'Small businesses served' },
    { value: '98%',   label: 'Customer satisfaction' },
    { value: '40%',   label: 'Average cost reduction' },
    { value: '12hrs', label: 'Saved per week, per business' },
  ];
  return (
    <View style={{ paddingHorizontal: pad, marginBottom: 90 }}>
      <View style={{
        backgroundColor: C.card,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: C.border,
        padding: isDesktop ? 40 : 32,
        flexDirection: isDesktop ? 'row' : 'column',
        gap: isDesktop ? 0 : 28,
      }}>
        {stats.map((s, i) => (
          <React.Fragment key={i}>
            {i > 0 && isDesktop && <Divider vertical />}
            <View style={{ flex: isDesktop ? 1 : undefined, alignItems: 'center', gap: 6 }}>
              <Text style={{ color: C.blue, fontSize: isDesktop ? 46 : 36, fontWeight: '900', letterSpacing: -1 }}>
                {s.value}
              </Text>
              <Text style={{ color: C.muted, fontSize: 13, textAlign: 'center' }}>{s.label}</Text>
            </View>
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

// ─── Services ─────────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: '📈',
    color: C.blue,
    dim: C.blueDim,
    title: 'Sales Optimization',
    description: 'AI-driven tools that score your leads, automate follow-ups, and close deals faster — even while you sleep.',
    features: [
      'Smart lead scoring & prioritization',
      'Automated email & SMS sequences',
      'CRM sync and pipeline visibility',
      'Sales forecasting & performance reports',
      'AI chat widget for your website',
    ],
    placeholder: 'Sales AI — laptop screen showing a dark CRM dashboard with colored lead pipeline, charts, and AI score badges',
  },
  {
    icon: '👥',
    color: C.purple,
    dim: C.purpleDim,
    title: 'HR & Payroll',
    description: 'Onboard staff, manage schedules, and run payroll in one click. Stay compliant without the admin overhead.',
    features: [
      'One-click payroll processing',
      'Automated tax calculations & filing',
      'Employee self-service portal',
      'Smart shift scheduling & time tracking',
      'Compliance alerts & HR document storage',
    ],
    placeholder: 'HR Dashboard — employee roster grid, payroll summary card, and tax status indicators on dark modern UI',
  },
  {
    icon: '📊',
    color: C.teal,
    dim: C.tealDim,
    title: 'Smart Accounting',
    description: 'Connect your bank, auto-categorize transactions, and generate reports instantly. No accounting degree needed.',
    features: [
      'Bank & credit card sync',
      'AI auto-categorization of transactions',
      'Invoicing & accounts receivable tracking',
      'Real-time P&L, cash flow, and balance sheet',
      'Tax-ready exports and filing support',
    ],
    placeholder: 'Accounting Dashboard — colorful bar charts showing monthly profit/loss, donut chart for expense categories, cash flow graph',
  },
];

function ServiceCard({ service }) {
  const { isDesktop } = useLayout();
  const { icon, color, dim, title, description, features, placeholder } = service;
  return (
    <View style={{
      flex: isDesktop ? 1 : undefined,
      backgroundColor: C.card,
      borderRadius: 22,
      borderWidth: 1,
      borderColor: C.border,
      overflow: 'hidden',
      marginBottom: isDesktop ? 0 : 24,
    }}>
      <Placeholder height={210} label={placeholder} borderRadius={0} />
      <View style={{ padding: 28, gap: 18 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <View style={{
            width: 46, height: 46, borderRadius: 13,
            backgroundColor: dim,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Text style={{ fontSize: 22 }}>{icon}</Text>
          </View>
          <Text style={{ color: C.text, fontSize: 21, fontWeight: '800' }}>{title}</Text>
        </View>

        <Text style={{ color: C.mid, fontSize: 14, lineHeight: 24 }}>{description}</Text>

        <View style={{ gap: 9 }}>
          {features.map((f, i) => (
            <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color, flexShrink: 0 }} />
              <Text style={{ color: C.mid, fontSize: 13, flex: 1 }}>{f}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={{
          marginTop: 6,
          borderRadius: 11,
          borderWidth: 1,
          borderColor: color + '55',
          backgroundColor: dim,
          paddingVertical: 13,
          alignItems: 'center',
        }}>
          <Text style={{ color, fontSize: 14, fontWeight: '700' }}>Learn More  →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Services() {
  const { isDesktop, pad } = useLayout();
  return (
    <View style={{ paddingHorizontal: pad, marginBottom: 90 }}>
      <SectionHeading
        badge="OUR SERVICES"
        title="Three pillars of business automation"
        subtitle="From closing deals to cutting paychecks to balancing books — we handle the work that slows you down."
        center
      />
      <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 24 }}>
        {SERVICES.map((s, i) => <ServiceCard key={i} service={s} />)}
      </View>
    </View>
  );
}

// ─── How it works ─────────────────────────────────────────────────────────────

const STEPS = [
  {
    n: '01',
    title: 'Connect Your Tools',
    description: 'Link your existing software — QuickBooks, Stripe, your payroll provider, or your CRM. We integrate with 100+ tools out of the box.',
  },
  {
    n: '02',
    title: 'Configure Your Workflows',
    description: 'Choose which tasks to automate. Our AI suggests the highest-impact workflows for your specific industry and team size.',
  },
  {
    n: '03',
    title: 'Watch It Run',
    description: 'Your automation goes live. Monitor time savings, track performance, and refine workflows as your business grows.',
  },
];

function HowItWorks() {
  const { isDesktop, pad } = useLayout();
  return (
    <View style={{ backgroundColor: C.surface, paddingHorizontal: pad, paddingVertical: 80, marginBottom: 90 }}>
      <SectionHeading
        badge="HOW IT WORKS"
        title="Up and running in minutes"
        subtitle="No IT team required. No complicated setup. Just connect, configure, and let the AI take it from there."
        center
      />
      <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 20 }}>
        {STEPS.map((s, i) => (
          <View key={i} style={{
            flex: isDesktop ? 1 : undefined,
            backgroundColor: C.card,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: C.border,
            padding: 30,
            gap: 16,
            marginBottom: isDesktop ? 0 : 16,
          }}>
            <View style={{
              width: 48, height: 48, borderRadius: 13,
              backgroundColor: C.blue,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '900' }}>{s.n}</Text>
            </View>
            <Text style={{ color: C.text, fontSize: 19, fontWeight: '800' }}>{s.title}</Text>
            <Text style={{ color: C.mid, fontSize: 14, lineHeight: 24 }}>{s.description}</Text>
          </View>
        ))}
      </View>

      <View style={{ marginTop: 48 }}>
        <Placeholder
          height={320}
          label="Workflow diagram — three-step visual showing tool icons connected by animated arrows into a central AI hub, dark background"
          borderRadius={18}
        />
      </View>
    </View>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: 'We cut payroll processing from 4 hours to 15 minutes. SmartBiz AI paid for itself in the very first month.',
    name: 'Maria T.',
    role: 'Owner',
    company: 'Bloom & Co Bakery',
    avatarLabel: 'Professional headshot — woman, 40s, warm smile, bakery owner',
  },
  {
    quote: 'The sales automation alone brought in 3 new clients in 2 weeks. The AI follow-up sequences are genuinely impressive.',
    name: 'James R.',
    role: 'Founder',
    company: 'Redline HVAC',
    avatarLabel: 'Professional headshot — man, 35, confident, trades business owner',
  },
  {
    quote: "I used to spend every Sunday on bookkeeping. Now I spend it with my family. The accounting module is flawless.",
    name: 'Sofia L.',
    role: 'CEO',
    company: 'Luma Design Studio',
    avatarLabel: 'Professional headshot — woman, 30s, creative professional, studio owner',
  },
];

function Testimonials() {
  const { isDesktop, pad } = useLayout();
  return (
    <View style={{ paddingHorizontal: pad, marginBottom: 90 }}>
      <SectionHeading
        badge="TESTIMONIALS"
        title="Businesses like yours are saving thousands"
        center
      />
      <View style={{ flexDirection: isDesktop ? 'row' : 'column', gap: 22 }}>
        {TESTIMONIALS.map((t, i) => (
          <View key={i} style={{
            flex: isDesktop ? 1 : undefined,
            backgroundColor: C.card,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: C.border,
            padding: 28,
            gap: 18,
            marginBottom: isDesktop ? 0 : 16,
          }}>
            <View style={{ flexDirection: 'row', gap: 2 }}>
              {[1,2,3,4,5].map(j => (
                <Text key={j} style={{ color: C.gold, fontSize: 15 }}>★</Text>
              ))}
            </View>
            <Text style={{ color: C.mid, fontSize: 14, lineHeight: 25, fontStyle: 'italic', flex: 1 }}>
              "{t.quote}"
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <AvatarPlaceholder size={46} label={t.avatarLabel} />
              <View>
                <Text style={{ color: C.text, fontSize: 14, fontWeight: '700' }}>{t.name}</Text>
                <Text style={{ color: C.muted, fontSize: 12 }}>{t.role} · {t.company}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: 'Starter',
    price: '49',
    description: 'For solo operators and micro-teams taking their first automation steps.',
    features: [
      '1 automation module',
      'Up to 5 users',
      'Core reporting dashboard',
      'Email support',
    ],
    highlighted: false,
  },
  {
    name: 'Growth',
    price: '129',
    description: 'The most popular plan — all three modules for a growing small business.',
    features: [
      'All 3 automation modules',
      'Up to 25 users',
      'Advanced analytics & forecasting',
      'Priority email & chat support',
      'API access & webhooks',
    ],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '299',
    description: 'Custom workflows and white-glove support for established businesses.',
    features: [
      'Unlimited automation modules',
      'Unlimited users',
      'Custom integrations & workflows',
      'Dedicated account manager',
      '99.9% SLA guarantee',
      'Onboarding & migration support',
    ],
    highlighted: false,
  },
];

function PricingCard({ plan }) {
  const { name, price, description, features, highlighted } = plan;
  const textColor = highlighted ? '#fff' : C.text;
  const mutedColor = highlighted ? 'rgba(255,255,255,0.7)' : C.muted;

  return (
    <View style={{
      flex: 1,
      backgroundColor: highlighted ? C.blue : C.card,
      borderRadius: 22,
      borderWidth: highlighted ? 0 : 1,
      borderColor: C.border,
      padding: 32,
      gap: 22,
    }}>
      <View style={{ gap: 10 }}>
        <Text style={{ color: mutedColor, fontSize: 12, fontWeight: '800', letterSpacing: 1.2, textTransform: 'uppercase' }}>
          {name}
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 4 }}>
          <Text style={{ color: textColor, fontSize: 48, fontWeight: '900', letterSpacing: -2 }}>${price}</Text>
          <Text style={{ color: mutedColor, fontSize: 14, marginBottom: 12 }}>/month</Text>
        </View>
        <Text style={{ color: highlighted ? 'rgba(255,255,255,0.8)' : C.mid, fontSize: 14, lineHeight: 22 }}>
          {description}
        </Text>
      </View>

      <Divider />

      <View style={{ gap: 12 }}>
        {features.map((f, i) => (
          <View key={i} style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{
              width: 20, height: 20, borderRadius: 10,
              backgroundColor: highlighted ? 'rgba(255,255,255,0.22)' : C.blueDim,
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Text style={{ color: highlighted ? '#fff' : C.blue, fontSize: 11, fontWeight: '900' }}>✓</Text>
            </View>
            <Text style={{ color: highlighted ? 'rgba(255,255,255,0.88)' : C.mid, fontSize: 13, flex: 1 }}>{f}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={{
        marginTop: 4,
        borderRadius: 13,
        paddingVertical: 15,
        alignItems: 'center',
        backgroundColor: highlighted ? '#fff' : 'transparent',
        borderWidth: highlighted ? 0 : 1.5,
        borderColor: C.borderHi,
      }}>
        <Text style={{ color: C.blue, fontSize: 15, fontWeight: '800' }}>
          {highlighted ? 'Get Started' : 'Start Free Trial'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Pricing() {
  const { isDesktop, pad } = useLayout();
  return (
    <View style={{ paddingHorizontal: pad, marginBottom: 90 }}>
      <SectionHeading
        badge="PRICING"
        title="Simple, transparent pricing"
        subtitle="No hidden fees. No long-term contracts. Cancel anytime."
        center
      />
      <View style={{
        flexDirection: isDesktop ? 'row' : 'column',
        gap: 22,
        alignItems: isDesktop ? 'flex-start' : 'stretch',
      }}>
        {PLANS.map((p, i) => <PricingCard key={i} plan={p} />)}
      </View>
    </View>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  const { isDesktop, pad } = useLayout();
  return (
    <View style={{ paddingHorizontal: pad, marginBottom: 90 }}>
      <View style={{
        backgroundColor: C.blue,
        borderRadius: 26,
        padding: isDesktop ? 72 : 44,
        alignItems: 'center',
        gap: 22,
      }}>
        <Text style={{
          color: '#fff',
          fontSize: isDesktop ? 46 : 30,
          fontWeight: '900',
          textAlign: 'center',
          maxWidth: 520,
          lineHeight: isDesktop ? 56 : 40,
          letterSpacing: -0.8,
        }}>
          Ready to automate your business?
        </Text>
        <Text style={{
          color: 'rgba(255,255,255,0.78)',
          fontSize: 17, lineHeight: 28,
          textAlign: 'center', maxWidth: 460,
        }}>
          Join 500+ small businesses saving time and money with SmartBiz AI. No credit card required to get started.
        </Text>
        <View style={{ flexDirection: 'row', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
          <TouchableOpacity style={{
            backgroundColor: '#fff', borderRadius: 13,
            paddingHorizontal: 30, paddingVertical: 16,
          }}>
            <Text style={{ color: C.blue, fontSize: 16, fontWeight: '800' }}>Start Free Trial</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            borderRadius: 13, paddingHorizontal: 30, paddingVertical: 16,
            borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.38)',
          }}>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>Contact Sales</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const { isDesktop, pad } = useLayout();
  const cols = [
    { heading: 'Product',  links: ['Sales AI', 'HR & Payroll', 'Accounting', 'Integrations', 'Changelog'] },
    { heading: 'Company',  links: ['About', 'Blog', 'Careers', 'Contact'] },
    { heading: 'Legal',    links: ['Privacy Policy', 'Terms of Service', 'Security', 'Cookie Policy'] },
  ];
  return (
    <View style={{
      paddingHorizontal: pad,
      paddingTop: 56,
      paddingBottom: 40,
      borderTopWidth: 1,
      borderTopColor: C.border,
      gap: 36,
    }}>
      <View style={{
        flexDirection: isDesktop ? 'row' : 'column',
        justifyContent: 'space-between',
        gap: 36,
      }}>
        <View style={{ gap: 14, maxWidth: 280 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={{ width: 34, height: 34, borderRadius: 9, backgroundColor: C.blue, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: '900' }}>S</Text>
            </View>
            <Text style={{ color: C.text, fontSize: 19, fontWeight: '800', letterSpacing: -0.3 }}>
              SmartBiz<Text style={{ color: C.blue }}>AI</Text>
            </Text>
          </View>
          <Text style={{ color: C.muted, fontSize: 13, lineHeight: 22 }}>
            Intelligent automation for small businesses. Sales, payroll, and accounting — simplified with AI.
          </Text>
        </View>

        {isDesktop && (
          <View style={{ flexDirection: 'row', gap: 64 }}>
            {cols.map(col => (
              <View key={col.heading} style={{ gap: 12 }}>
                <Text style={{ color: C.text, fontSize: 13, fontWeight: '700' }}>{col.heading}</Text>
                {col.links.map(link => (
                  <TouchableOpacity key={link}>
                    <Text style={{ color: C.muted, fontSize: 13 }}>{link}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}
          </View>
        )}
      </View>

      <Divider />
      <Text style={{ color: C.muted, fontSize: 12, textAlign: 'center' }}>
        © 2025 SmartBiz AI. All rights reserved.
      </Text>
    </View>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Navbar />
      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
        <Hero />
        <StatsBanner />
        <Services />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <FinalCTA />
        <Footer />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root:   { flex: 1, backgroundColor: C.bg },
  scroll: { flex: 1 },
});
