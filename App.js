import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  Image,
  TextInput,
} from 'react-native';

// ─── Theme ───────────────────────────────────────────────────────────────────

const C = {
  bg:       '#04080F',
  surface:  '#080E1C',
  card:     '#0C1322',
  card2:    '#080E1C',
  teal:     '#3B82F6',
  teal2:    '#60A5FA',
  tealDim:  'rgba(59,130,246,0.12)',
  tealGlow: 'rgba(59,130,246,0.25)',
  border:   'rgba(59,130,246,0.12)',
  borderHi: 'rgba(59,130,246,0.30)',
  text:     '#F1F5F9',
  mid:      '#94A3B8',
  muted:    '#475569',
  soft:     '#334155',
};

// ─── Layout hook ─────────────────────────────────────────────────────────────

function useLayout() {
  const { width } = useWindowDimensions();
  return {
    isDesktop: width >= 1024,
    isTablet:  width >= 768,
    pad:       width >= 1024 ? 80 : width >= 768 ? 40 : 20,
    w:         width,
  };
}

// ─── Shared components ───────────────────────────────────────────────────────

function Eyebrow({ children }) {
  return (
    <Text style={{
      color: C.teal,
      fontSize: 12,
      fontWeight: '900',
      letterSpacing: 2,
      textTransform: 'uppercase',
      marginBottom: 14,
    }}>
      {children}
    </Text>
  );
}

function Divider() {
  return <View style={{ height: 1, backgroundColor: C.border, marginVertical: 4 }} />;
}

function CheckItem({ children, light = false }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10, marginBottom: 12 }}>
      <Text style={{ color: C.teal, fontWeight: '900', fontSize: 15, marginTop: 1 }}>✓</Text>
      <Text style={{ color: light ? 'rgba(255,255,255,0.85)' : C.mid, fontSize: 14, lineHeight: 22, flex: 1 }}>
        {children}
      </Text>
    </View>
  );
}

function CTAButton({ label, primary = false, onPress, style }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.82}
      style={[{
        borderRadius: 10,
        paddingHorizontal: 24,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        ...(primary
          ? {
              background: 'linear-gradient(90deg,#2563EB,#3B82F6)',
              backgroundColor: C.teal,
            }
          : {
              borderWidth: 1,
              borderColor: C.border,
            }),
      }, style]}
    >
      <Text style={{
        fontSize: 16,
        fontWeight: '900',
        color: primary ? '#fff' : C.mid,
      }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function CTABox({ title, body, btnLabel, onPress }) {
  const { pad } = useLayout();
  return (
    <View style={{
      marginHorizontal: pad,
      marginBottom: 80,
      borderRadius: 28,
      borderWidth: 1,
      borderColor: C.borderHi,
      backgroundColor: C.card,
      padding: 48,
      alignItems: 'center',
    }}>
      <Text style={{
        color: C.text,
        fontSize: 32,
        fontWeight: '900',
        letterSpacing: -0.6,
        textAlign: 'center',
        marginBottom: 14,
      }}>
        {title}
      </Text>
      <Text style={{
        color: C.mid,
        fontSize: 17,
        lineHeight: 28,
        textAlign: 'center',
        maxWidth: 640,
        marginBottom: 28,
      }}>
        {body}
      </Text>
      <CTAButton label={btnLabel} primary onPress={onPress} />
    </View>
  );
}

// ─── Problem cards ────────────────────────────────────────────────────────────

const PROBLEMS = [
  { icon: '⚡', title: 'Lead Response',  body: 'New inquiries sit too long before anyone replies, and speed matters most when interest is fresh.' },
  { icon: '📅', title: 'Scheduling',     body: 'Back-and-forth booking, reminders, and rescheduling take time your team does not have.' },
  { icon: '💬', title: 'Follow-Up',      body: 'Prospects, customers, estimates, reviews, and repeat business slip through the cracks.' },
  { icon: '🧾', title: 'Admin Work',     body: 'Manual updates, copy-paste work, and routine reminders slow the day down.' },
];

function ProblemGrid() {
  const { isDesktop, isTablet } = useLayout();
  const cols = isDesktop ? 4 : isTablet ? 2 : 1;
  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 16,
    }}>
      {PROBLEMS.map((p, i) => (
        <View key={i} style={{
          flex: cols === 4 ? 1 : undefined,
          width: cols === 2 ? '47%' : cols === 1 ? '100%' : undefined,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: C.border,
          backgroundColor: C.card,
          padding: 24,
          minHeight: 200,
        }}>
          <Text style={{ fontSize: 32, marginBottom: 16 }}>{p.icon}</Text>
          <Text style={{ color: C.text, fontSize: 20, fontWeight: '800', marginBottom: 10 }}>{p.title}</Text>
          <Text style={{ color: C.mid, lineHeight: 24, fontSize: 14 }}>{p.body}</Text>
        </View>
      ))}
    </View>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { label: 'Home',        key: 'home' },
  { label: 'The Problem', key: 'problem' },
  { label: 'How It Works',key: 'how-it-works' },
  { label: 'Services',    key: 'services' },
  { label: 'Why Us',      key: 'why-us' },
  { label: 'Contact',     key: 'contact' },
];

function Navbar({ page, onNav, navItems = NAV_ITEMS }) {
  const { isDesktop, isTablet, pad } = useLayout();
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: pad,
      paddingVertical: 18,
      borderBottomWidth: 1,
      borderBottomColor: C.border,
      backgroundColor: 'rgba(2,7,7,0.92)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      {/* Brand */}
      <TouchableOpacity onPress={() => onNav('home')}>
        <Text style={{ color: C.text, fontSize: 28, fontWeight: '900', letterSpacing: -1 }}>
          SmartBiz<Text style={{ color: C.teal }}>AI</Text>
        </Text>
        {isDesktop && (
          <Text style={{ color: C.muted, fontSize: 10, letterSpacing: 1.2, marginTop: 3 }}>
            AI SOLUTIONS FOR SMALL BUSINESS
          </Text>
        )}
      </TouchableOpacity>

      {/* Nav links */}
      {isDesktop && (
        <View style={{ flexDirection: 'row', gap: 28, alignItems: 'center' }}>
          {navItems.map(item => (
            <TouchableOpacity key={item.key} onPress={() => onNav(item.key)}>
              <Text style={{
                color: page === item.key ? C.teal : '#eaf4f2',
                fontSize: 14,
                fontWeight: page === item.key ? '700' : '500',
              }}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* CTA */}
      <TouchableOpacity
        onPress={() => onNav('contact')}
        style={{
          borderRadius: 9,
          borderWidth: 1,
          borderColor: C.teal,
          paddingHorizontal: isTablet ? 18 : 12,
          paddingVertical: 11,
        }}
      >
        <Text style={{ color: C.text, fontWeight: '800', fontSize: isTablet ? 14 : 12 }}>
          Book Free Call
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const { pad } = useLayout();
  return (
    <View style={{
      borderTopWidth: 1,
      borderTopColor: C.border,
      paddingHorizontal: pad,
      paddingVertical: 30,
    }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <Text style={{ color: C.muted, fontSize: 13 }}>© 2026 SmartBizAI</Text>
        <Text style={{ color: C.muted, fontSize: 13 }}>Practical AI systems for small business.</Text>
        <Text style={{ color: C.muted, fontSize: 13, textAlign: 'right', flex: 1 }}>
          Tell us how your business works — we'll tell you where we can make it faster.
        </Text>
      </View>
    </View>
  );
}

// ─── Page hero ────────────────────────────────────────────────────────────────

function PageHero({ eyebrow, title, lead }) {
  const { pad } = useLayout();
  return (
    <View style={{ paddingHorizontal: pad, paddingTop: 70, paddingBottom: 36, alignItems: 'center' }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Text style={{
        color: C.text,
        fontSize: 42,
        fontWeight: '900',
        letterSpacing: -1.4,
        textAlign: 'center',
        maxWidth: 780,
        marginBottom: 18,
        lineHeight: 52,
      }}>
        {title}
      </Text>
      <Text style={{
        color: C.mid,
        fontSize: 18,
        lineHeight: 30,
        textAlign: 'center',
        maxWidth: 680,
      }}>
        {lead}
      </Text>
    </View>
  );
}

// ─── HOME PAGE ────────────────────────────────────────────────────────────────

function HomePage({ onNav }) {
  const { isDesktop, pad } = useLayout();
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      {/* Hero */}
      <View style={{
        paddingHorizontal: pad,
        paddingTop: 72,
        paddingBottom: 64,
        flexDirection: isDesktop ? 'row' : 'column',
        gap: 48,
        alignItems: 'center',
      }}>
        {/* Left text */}
        <View style={{ flex: isDesktop ? 1.05 : undefined, gap: 20 }}>
          <Eyebrow>Practical AI for owner-led teams</Eyebrow>
          <Text style={{
            color: C.text,
            fontSize: isDesktop ? 66 : 40,
            fontWeight: '900',
            lineHeight: isDesktop ? 72 : 48,
            letterSpacing: -2,
          }}>
            Your Business Already Works.{' '}
            <Text style={{ color: C.teal }}>We Help It Move Faster.</Text>
          </Text>
          <Text style={{ color: C.mid, fontSize: 18, lineHeight: 30, maxWidth: 560 }}>
            From lead response to scheduling, customer follow-up, and internal admin, we build practical AI systems that save your team time and reduce repetitive work.
          </Text>
          <View style={{ flexDirection: 'row', gap: 14, flexWrap: 'wrap', marginTop: 10 }}>
            <CTAButton label="→ Book a Free 5-Minute Call" primary onPress={() => onNav('contact')} />
            <CTAButton label="See How It Works" onPress={() => onNav('how-it-works')} />
          </View>
          <Text style={{ color: C.mid, fontSize: 15, marginTop: 4 }}>
            Tell me how your business works — I will tell you where we can make it faster.
          </Text>
        </View>

        {/* Right visual */}
        <View style={{
          flex: isDesktop ? 0.95 : undefined,
          width: isDesktop ? undefined : '100%',
          borderRadius: 26,
          borderWidth: 1,
          borderColor: C.border,
          overflow: 'hidden',
          backgroundColor: C.card,
        }}>
          <Image
            source={require('./assets/workflow-desktop.png')}
            style={{ width: '100%', height: isDesktop ? 360 : 240 }}
            resizeMode="cover"
          />
          <View style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
            backgroundColor: 'rgba(2,9,9,0.82)',
            borderRadius: 16,
            borderWidth: 1,
            borderColor: 'rgba(59,130,246,0.25)',
            padding: 18,
          }}>
            <Text style={{ color: C.text, fontSize: 17, fontWeight: '800', marginBottom: 6 }}>
              Best fit: small businesses under 50 employees
            </Text>
            <Text style={{ color: C.mid, fontSize: 13, lineHeight: 20 }}>
              We learn your process first, then build around the places where speed, consistency, and follow-up matter most.
            </Text>
          </View>
        </View>
      </View>

      {/* Problem section */}
      <View style={{
        paddingHorizontal: pad,
        paddingVertical: 60,
        borderTopWidth: 1,
        borderTopColor: 'rgba(59,130,246,0.08)',
      }}>
        <View style={{ alignItems: 'center', marginBottom: 36 }}>
          <Eyebrow>The Problem</Eyebrow>
          <Text style={{
            color: C.text,
            fontSize: 36,
            fontWeight: '900',
            letterSpacing: -1,
            textAlign: 'center',
            marginBottom: 12,
          }}>
            Small teams lose speed in the same places.
          </Text>
          <Text style={{ color: C.mid, fontSize: 17, lineHeight: 28, textAlign: 'center', maxWidth: 620 }}>
            Most small businesses are not broken. They are slowed down by repetitive work, missed handoffs, and follow-up that depends too much on memory.
          </Text>
        </View>
        <ProblemGrid />
        <View style={{
          marginTop: 24,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: 'rgba(59,130,246,0.30)',
          backgroundColor: 'rgba(59,130,246,0.06)',
          padding: 22,
          alignItems: 'center',
        }}>
          <Text style={{ color: C.text, fontSize: 20, fontWeight: '800', textAlign: 'center' }}>
            Our job: find the friction, then remove it without disrupting what already works.
          </Text>
        </View>
      </View>

      {/* Deck montage band */}
      <View style={{
        marginHorizontal: pad,
        marginBottom: 40,
        borderRadius: 22,
        borderWidth: 1,
        borderColor: C.border,
        overflow: 'hidden',
      }}>
        <Image
          source={require('./assets/deck-montage.png')}
          style={{ width: '100%', height: isDesktop ? 260 : 180 }}
          resizeMode="cover"
        />
      </View>

      <CTABox
        title="Let's Talk About Your Business"
        body="No pressure. No tech jargon. Just a quick conversation about how your business works, where your team may be losing time, and whether we can help."
        btnLabel="Book a Free 5-Minute Call"
        onPress={() => onNav('contact')}
      />

      <Footer />
    </ScrollView>
  );
}

// ─── PROBLEM PAGE ─────────────────────────────────────────────────────────────

function ProblemPage({ onNav }) {
  const { isDesktop, pad } = useLayout();
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <PageHero
        eyebrow="The Problem"
        title="Small Teams Lose Speed in the Same Places."
        lead="Most small businesses are not broken. They are slowed down by repetitive work, missed handoffs, and follow-up that depends too much on memory."
      />

      <View style={{
        paddingHorizontal: pad,
        paddingVertical: 40,
        borderTopWidth: 1,
        borderTopColor: 'rgba(59,130,246,0.08)',
        flexDirection: isDesktop ? 'row' : 'column',
        gap: 28,
        alignItems: 'center',
      }}>
        <View style={{ flex: 1 }}>
          <ProblemGrid />
        </View>
        <View style={{ flex: isDesktop ? 0.9 : undefined, width: isDesktop ? undefined : '100%' }}>
          <Image
            source={require('./assets/reception-workflow.png')}
            style={{
              width: '100%',
              height: isDesktop ? 400 : 240,
              borderRadius: 24,
              borderWidth: 1,
              borderColor: C.border,
            }}
            resizeMode="cover"
          />
        </View>
      </View>

      <CTABox
        title="Where Is Your Team Losing Time?"
        body="We'll listen first, then identify whether AI can help make the process faster, cleaner, and more consistent."
        btnLabel="Book a Free 5-Minute Call"
        onPress={() => onNav('contact')}
      />

      <Footer />
    </ScrollView>
  );
}

// ─── HOW IT WORKS PAGE ────────────────────────────────────────────────────────

const STEPS = [
  { n: '1', title: 'Sit Down With You',    body: 'We meet in person and learn how your business actually runs.' },
  { n: '2', title: 'Find Bottlenecks',     body: 'We map lead flow, scheduling, follow-up, admin, and internal handoffs.' },
  { n: '3', title: 'Build Where It Helps', body: 'We create practical AI systems only where they save time or improve consistency.' },
  { n: '4', title: 'Support & Improve',    body: 'We monitor, adjust, and keep improving as your business changes.' },
];

function HowItWorksPage({ onNav }) {
  const { isDesktop, isTablet, pad } = useLayout();
  const cols = isDesktop ? 4 : isTablet ? 2 : 1;
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <PageHero
        eyebrow="How It Works"
        title="We Listen First. Then We Build Only What Makes Sense."
        lead="No pressure. No tech jargon. Just a practical conversation about what is working, what is not, and whether our tools can create value."
      />

      {/* Steps */}
      <View style={{
        paddingHorizontal: pad,
        paddingVertical: 40,
        borderTopWidth: 1,
        borderTopColor: 'rgba(59,130,246,0.08)',
      }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 16 }}>
          {STEPS.map((s, i) => (
            <View key={i} style={{
              flex: cols === 4 ? 1 : undefined,
              width: cols === 2 ? '47%' : cols === 1 ? '100%' : undefined,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: C.border,
              backgroundColor: C.card,
              padding: 26,
            }}>
              <View style={{
                width: 40, height: 40, borderRadius: 20,
                borderWidth: 1, borderColor: C.border,
                backgroundColor: C.tealDim,
                alignItems: 'center', justifyContent: 'center',
                marginBottom: 16,
              }}>
                <Text style={{ color: C.teal, fontWeight: '900', fontSize: 16 }}>{s.n}</Text>
              </View>
              <Text style={{ color: C.text, fontSize: 20, fontWeight: '800', marginBottom: 10 }}>{s.title}</Text>
              <Text style={{ color: C.mid, fontSize: 14, lineHeight: 24 }}>{s.body}</Text>
            </View>
          ))}
        </View>

        {/* Quote */}
        <View style={{
          marginTop: 24,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: C.border,
          backgroundColor: C.card,
          padding: 28,
          alignItems: 'center',
        }}>
          <Text style={{ color: C.text, fontSize: 22, fontWeight: '800', textAlign: 'center', lineHeight: 34 }}>
            We do not sell you technology you do not need. We learn your business first, then determine if and where our tools can actually create value.
          </Text>
        </View>
      </View>

      {/* Split: image + panel */}
      <View style={{
        paddingHorizontal: pad,
        paddingVertical: 40,
        borderTopWidth: 1,
        borderTopColor: 'rgba(59,130,246,0.08)',
        flexDirection: isDesktop ? 'row' : 'column',
        gap: 28,
        alignItems: 'center',
      }}>
        <Image
          source={require('./assets/meeting.png')}
          style={{
            flex: isDesktop ? 1 : undefined,
            width: isDesktop ? undefined : '100%',
            height: isDesktop ? 400 : 260,
            borderRadius: 24,
            borderWidth: 1,
            borderColor: C.border,
          }}
          resizeMode="cover"
        />
        <View style={{
          flex: isDesktop ? 1 : undefined,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: C.border,
          backgroundColor: C.card,
          padding: 30,
        }}>
          <Text style={{ color: C.text, fontSize: 26, fontWeight: '800', marginBottom: 14 }}>
            What the first conversation is really about
          </Text>
          <Text style={{ color: C.mid, fontSize: 15, lineHeight: 26, marginBottom: 14 }}>
            We are not trying to force a tool into your business. We are trying to understand how your team already works.
          </Text>
          <CheckItem>What feels slow or repetitive?</CheckItem>
          <CheckItem>Where do leads, customers, or tasks get stuck?</CheckItem>
          <CheckItem>What already works and should not be disrupted?</CheckItem>
          <CheckItem>Where could a simple system create real value?</CheckItem>
        </View>
      </View>

      <CTABox
        title="Let's Talk About Your Business"
        body="No pressure. No tech jargon. Just a quick conversation about how your business works, where your team may be losing time, and whether we can help."
        btnLabel="Book a Free 5-Minute Call"
        onPress={() => onNav('contact')}
      />

      <Footer />
    </ScrollView>
  );
}

// ─── SERVICES PAGE ────────────────────────────────────────────────────────────

const PLANS = [
  {
    name: 'Bronze',
    price: '$499',
    per: 'per month',
    fit: 'Best for smaller businesses needing one core workflow improved.',
    features: ['1 primary workflow', 'Maintenance', 'Troubleshooting', 'Minor edits', 'Email support'],
    featured: false,
  },
  {
    name: 'Silver',
    price: '$999',
    per: 'per month',
    fit: 'Most businesses land here — several key workflows improved together.',
    features: ['Up to 3 workflows', 'CRM integrations', 'Monthly optimization', 'Performance review', 'Strategy check-in'],
    featured: true,
  },
  {
    name: 'Gold',
    price: '$1,999',
    per: 'per month',
    fit: 'Full-service automation partnership for teams that want hands-on support.',
    features: ['Multi-workflow systems', 'Priority support', 'Custom builds', 'Strategy consulting', '5 in-office hrs/mo'],
    featured: false,
  },
];

function ServicesPage({ onNav }) {
  const { isDesktop, isTablet, pad } = useLayout();
  const cols = isDesktop ? 3 : isTablet ? 2 : 1;
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <PageHero
        eyebrow="Services & Pricing"
        title="Simple Packages After We Understand Your Workflow."
        lead="Every engagement starts with a one-time Business Analysis & Workflow Setup so we understand your operation before building anything."
      />

      <View style={{
        paddingHorizontal: pad,
        paddingVertical: 40,
        borderTopWidth: 1,
        borderTopColor: 'rgba(59,130,246,0.08)',
      }}>
        {/* Setup fee */}
        <View style={{
          borderRadius: 22,
          borderWidth: 1,
          borderColor: C.borderHi,
          backgroundColor: 'rgba(5,26,24,0.9)',
          padding: 30,
          flexDirection: isTablet ? 'row' : 'column',
          justifyContent: 'space-between',
          alignItems: isTablet ? 'center' : 'flex-start',
          gap: 20,
          marginBottom: 28,
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: C.text, fontSize: 28, fontWeight: '900', marginBottom: 10 }}>
              Business Analysis & Workflow Setup
            </Text>
            <Text style={{ color: C.mid, fontSize: 15, lineHeight: 26 }}>
              We do a deep dive into how your business currently operates, identify time-loss and repetitive tasks, map your lead flow, customer flow, and admin bottlenecks, then create the implementation roadmap.
            </Text>
          </View>
          <View style={{ alignItems: isTablet ? 'flex-end' : 'flex-start' }}>
            <Text style={{ color: C.teal, fontSize: 52, fontWeight: '900', letterSpacing: -2 }}>$1,499</Text>
            <Text style={{ color: C.mid, fontSize: 15 }}>one-time setup</Text>
          </View>
        </View>

        {/* Pricing cards */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 20, alignItems: 'flex-start' }}>
          {PLANS.map((plan, i) => (
            <View key={i} style={{
              flex: cols === 3 ? 1 : undefined,
              width: cols === 2 ? '47%' : cols === 1 ? '100%' : undefined,
              borderRadius: 22,
              borderWidth: 1,
              borderColor: plan.featured ? C.borderHi : C.border,
              backgroundColor: C.card,
              padding: 28,
              position: 'relative',
              ...(plan.featured ? { transform: [{ translateY: -8 }] } : {}),
            }}>
              {plan.featured && (
                <View style={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  backgroundColor: C.tealDim,
                  borderRadius: 999,
                  borderWidth: 1,
                  borderColor: C.border,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}>
                  <Text style={{ color: C.teal, fontSize: 11, fontWeight: '900' }}>Most Popular</Text>
                </View>
              )}
              <Text style={{ color: C.text, fontSize: 28, fontWeight: '900', marginBottom: 6 }}>{plan.name}</Text>
              <Text style={{ color: C.teal, fontSize: 40, fontWeight: '900', letterSpacing: -1, marginBottom: 2 }}>
                {plan.price}
              </Text>
              <Text style={{ color: C.muted, fontSize: 14, marginBottom: 16 }}>{plan.per}</Text>
              <Text style={{ color: C.mid, fontSize: 14, lineHeight: 22, marginBottom: 20, minHeight: 48 }}>{plan.fit}</Text>
              <Divider />
              <View style={{ marginTop: 16, gap: 2 }}>
                {plan.features.map((f, j) => <CheckItem key={j}>{f}</CheckItem>)}
              </View>
            </View>
          ))}
        </View>

        <View style={{
          marginTop: 24,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: C.border,
          backgroundColor: C.card,
          padding: 22,
          alignItems: 'center',
        }}>
          <Text style={{ color: C.mid, fontSize: 15, textAlign: 'center', lineHeight: 26 }}>
            <Text style={{ color: C.text, fontWeight: '700' }}>Common automations: </Text>
            missed-call text back, lead follow-up, appointment reminders, review requests, CRM updates, and admin workflows.
          </Text>
        </View>
      </View>

      <CTABox
        title="Not Sure Which Plan Fits?"
        body="That is exactly what the first call is for. Tell us how your business works and we'll help determine where, if anywhere, our tools can create value."
        btnLabel="Book a Free 5-Minute Call"
        onPress={() => onNav('contact')}
      />

      <Footer />
    </ScrollView>
  );
}

// ─── WHY US PAGE ─────────────────────────────────────────────────────────────

const WHY_CARDS = [
  { icon: '🪄', title: 'Under 50 Employees', body: 'Designed for small teams where time, speed, and communication matter every day.' },
  { icon: '🤝', title: 'Hands-On',           body: 'We are relationship-driven and close enough to actually learn the business.' },
  { icon: '🚀', title: 'Fast & Flexible',    body: 'What we lack in size, we make up for with agility and responsiveness.' },
  { icon: '🎯', title: 'Results-Driven',     body: 'We focus on practical outcomes: saving time, improving follow-up, and reducing repetitive work.' },
];

function WhyUsPage({ onNav }) {
  const { isDesktop, isTablet, pad } = useLayout();
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <PageHero
        eyebrow="Why SmartBizAI"
        title="Small, Family-Oriented, Eager to Learn, and Results-Driven."
        lead="We are not here to sell you technology you do not need. We are here to understand your business, find friction, and help your team move faster where it actually matters."
      />

      <View style={{
        paddingHorizontal: pad,
        paddingVertical: 40,
        borderTopWidth: 1,
        borderTopColor: 'rgba(59,130,246,0.08)',
        flexDirection: isDesktop ? 'row' : 'column',
        gap: 24,
      }}>
        {/* Big left panel */}
        <View style={{
          flex: isDesktop ? 1 : undefined,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: C.border,
          backgroundColor: C.card,
          overflow: 'hidden',
        }}>
          <Image
            source={require('./assets/owner-handshake.png')}
            style={{ width: '100%', height: isDesktop ? 320 : 240 }}
            resizeMode="cover"
          />
          <View style={{ padding: 28 }}>
            <Text style={{ color: C.text, fontSize: 26, fontWeight: '800', marginBottom: 12 }}>
              Built for owner-led teams.
            </Text>
            <Text style={{ color: C.mid, fontSize: 15, lineHeight: 26 }}>
              We work best with small businesses where the owner still knows the day-to-day operation, cares about the people, and wants the team to move faster without turning the business upside down.
            </Text>
          </View>
        </View>

        {/* Right card grid */}
        <View style={{
          flex: isDesktop ? 1 : undefined,
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          {WHY_CARDS.map((c, i) => (
            <View key={i} style={{
              width: isTablet ? '47%' : '100%',
              borderRadius: 20,
              borderWidth: 1,
              borderColor: C.border,
              backgroundColor: C.card,
              padding: 24,
              minHeight: 180,
            }}>
              <Text style={{ fontSize: 30, marginBottom: 12 }}>{c.icon}</Text>
              <Text style={{ color: C.text, fontSize: 19, fontWeight: '800', marginBottom: 8 }}>{c.title}</Text>
              <Text style={{ color: C.mid, fontSize: 14, lineHeight: 22 }}>{c.body}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Values strip */}
      <View style={{
        paddingHorizontal: pad,
        paddingVertical: 24,
        marginBottom: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(59,130,246,0.08)',
      }}>
        {[
          '✓  Built for small businesses under 50 employees',
          '✓  Hands-on and relationship-driven',
          '✓  Fast, flexible, and practical',
          '✓  We learn before we build',
        ].map((line, i) => (
          <Text key={i} style={{ color: C.mid, fontSize: 18, fontWeight: '700', marginBottom: 12 }}>
            {line}
          </Text>
        ))}
      </View>

      <CTABox
        title="Let's Talk About Your Business"
        body="No pressure. No tech jargon. Just a quick conversation about how your business works, where your team may be losing time, and whether we can help."
        btnLabel="Book a Free 5-Minute Call"
        onPress={() => onNav('contact')}
      />

      <Footer />
    </ScrollView>
  );
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────

function ContactPage() {
  const { isDesktop, pad } = useLayout();
  const [form, setForm] = useState({ name: '', business: '', contact: '', improve: '', message: '' });

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <PageHero
        eyebrow="Free 5-Minute Call"
        title="Tell Us How Your Business Works."
        lead="No pressure. No tech jargon. Just a quick conversation about what's working, what's not, and whether SmartBizAI can help your team move faster."
      />

      <View style={{
        paddingHorizontal: pad,
        paddingVertical: 40,
        borderTopWidth: 1,
        borderTopColor: 'rgba(59,130,246,0.08)',
        flexDirection: isDesktop ? 'row' : 'column',
        gap: 24,
        marginBottom: 60,
      }}>
        {/* Left panel */}
        <View style={{
          flex: 1,
          borderRadius: 22,
          borderWidth: 1,
          borderColor: C.border,
          backgroundColor: C.card,
          padding: 30,
        }}>
          <Text style={{ color: C.text, fontSize: 24, fontWeight: '800', marginBottom: 14 }}>
            What we want to learn
          </Text>
          <Text style={{ color: C.mid, fontSize: 15, lineHeight: 26, marginBottom: 20 }}>
            We are genuinely interested in learning how your business operates before suggesting anything.
          </Text>
          <CheckItem>What part of the business feels slow or repetitive?</CheckItem>
          <CheckItem>Where are leads, customers, or tasks getting stuck?</CheckItem>
          <CheckItem>What is already working and should stay untouched?</CheckItem>
          <CheckItem>Can our current tools provide real value to your team?</CheckItem>
        </View>

        {/* Right form */}
        <View style={{
          flex: 1,
          borderRadius: 22,
          borderWidth: 1,
          borderColor: C.border,
          backgroundColor: C.card,
          padding: 30,
          gap: 12,
        }}>
          <Text style={{ color: C.text, fontSize: 24, fontWeight: '800', marginBottom: 6 }}>
            Request the Call
          </Text>

          {[
            { key: 'name',     placeholder: 'Name' },
            { key: 'business', placeholder: 'Business name' },
            { key: 'contact',  placeholder: 'Phone or email' },
          ].map(field => (
            <TextInput
              key={field.key}
              placeholder={field.placeholder}
              placeholderTextColor={C.muted}
              value={form[field.key]}
              onChangeText={v => setForm(f => ({ ...f, [field.key]: v }))}
              style={{
                borderWidth: 1,
                borderColor: C.border,
                borderRadius: 12,
                padding: 14,
                color: C.text,
                backgroundColor: 'rgba(1,9,9,0.8)',
                fontSize: 15,
              }}
            />
          ))}

          <View style={{
            borderWidth: 1,
            borderColor: C.border,
            borderRadius: 12,
            padding: 14,
            backgroundColor: 'rgba(1,9,9,0.8)',
          }}>
            <Text style={{ color: form.improve ? C.text : C.muted, fontSize: 15 }}>
              {form.improve || 'What do you most want to improve?'}
            </Text>
          </View>

          <TextInput
            placeholder="Briefly tell us what feels slow, repetitive, or hard to keep up with."
            placeholderTextColor={C.muted}
            value={form.message}
            onChangeText={v => setForm(f => ({ ...f, message: v }))}
            multiline
            numberOfLines={4}
            style={{
              borderWidth: 1,
              borderColor: C.border,
              borderRadius: 12,
              padding: 14,
              color: C.text,
              backgroundColor: 'rgba(1,9,9,0.8)',
              fontSize: 15,
              minHeight: 120,
              textAlignVertical: 'top',
            }}
          />

          <CTAButton label="Book a Free 5-Minute Call" primary style={{ marginTop: 4 }} />

          <Text style={{ color: C.muted, fontSize: 12, textAlign: 'center', marginTop: 4 }}>
            This form can be connected to Calendly, email, phone, or a CRM.
          </Text>
        </View>
      </View>

      <Footer />
    </ScrollView>
  );
}

// ─── ABOUT US PAGE ───────────────────────────────────────────────────────────

function AboutPage({ onNav }) {
  const { isDesktop, pad } = useLayout();
  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <PageHero
        eyebrow="About Us"
        title="Small, Family-Oriented, Eager to Learn, and Results-Driven."
        lead="We are not here to sell you technology you do not need. We are here to understand your business, find friction, and help your team move faster where it actually matters."
      />

      {/* Owner photo + bio */}
      <View style={{
        paddingHorizontal: pad,
        paddingVertical: 40,
        borderTopWidth: 1,
        borderTopColor: 'rgba(59,130,246,0.08)',
        flexDirection: isDesktop ? 'row' : 'column',
        gap: 40,
        alignItems: isDesktop ? 'flex-start' : 'stretch',
      }}>
        {/* Photo */}
        <View style={{
          borderRadius: 24,
          borderWidth: 2,
          borderColor: C.borderHi,
          overflow: 'hidden',
          width: isDesktop ? 340 : '100%',
          alignSelf: isDesktop ? 'flex-start' : 'center',
        }}>
          <Image
            source={require('./assets/BizOwners.jpg')}
            style={{ width: isDesktop ? 340 : '100%', aspectRatio: 844 / 973 }}
            resizeMode="cover"
          />
        </View>

        {/* Bio */}
        <View style={{ flex: 1, gap: 20 }}>
          <Text style={{
            color: C.text,
            fontSize: isDesktop ? 36 : 26,
            fontWeight: '900',
            lineHeight: isDesktop ? 46 : 36,
            letterSpacing: -0.6,
          }}>
            Built for small businesses,{'\n'}
            <Text style={{ color: C.teal }}>by people who get it.</Text>
          </Text>
          <Text style={{ color: C.mid, fontSize: 16, lineHeight: 28 }}>
            We started SmartBizAI after watching great small businesses struggle with the same repetitive friction that slows owner-led teams down every single day — slow lead response, missed follow-up, admin that never ends.
          </Text>
          <Text style={{ color: C.mid, fontSize: 16, lineHeight: 28 }}>
            Our approach is simple: sit down with you, learn how your business actually runs, and build only where automation creates real value. No tech jargon. No overselling. Just practical systems that save your team time.
          </Text>

          {/* Value pills */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
            {[
              { icon: '🎯', label: 'Results-driven' },
              { icon: '🤝', label: 'Relationship-first' },
              { icon: '⚡', label: 'Fast & practical' },
              { icon: '🏠', label: 'Family-oriented' },
            ].map((v, i) => (
              <View key={i} style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: C.border,
                backgroundColor: C.card,
                paddingHorizontal: 16,
                paddingVertical: 10,
              }}>
                <Text style={{ fontSize: 16 }}>{v.icon}</Text>
                <Text style={{ color: C.text, fontSize: 14, fontWeight: '700' }}>{v.label}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <CTABox
        title="Let's Talk About Your Business"
        body="No pressure. No tech jargon. Just a quick conversation about how your business works, where your team may be losing time, and whether we can help."
        btnLabel="Book a Free 5-Minute Call"
        onPress={() => onNav('contact')}
      />

      <Footer />
    </ScrollView>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

const NAV_ITEMS_FULL = [
  { label: 'Home',        key: 'home' },
  { label: 'The Problem', key: 'problem' },
  { label: 'How It Works',key: 'how-it-works' },
  { label: 'Services',    key: 'services' },
  { label: 'Why Us',      key: 'why-us' },
  { label: 'About Us',    key: 'about' },
  { label: 'Contact',     key: 'contact' },
];

export default function App() {
  const [page, setPage] = useState('home');

  function renderPage() {
    switch (page) {
      case 'problem':      return <ProblemPage     onNav={setPage} />;
      case 'how-it-works': return <HowItWorksPage  onNav={setPage} />;
      case 'services':     return <ServicesPage     onNav={setPage} />;
      case 'why-us':       return <WhyUsPage        onNav={setPage} />;
      case 'about':        return <AboutPage        onNav={setPage} />;
      case 'contact':      return <ContactPage />;
      default:             return <HomePage         onNav={setPage} />;
    }
  }

  return (
    <View style={styles.root}>
      <StatusBar style="light" />
      <Navbar page={page} onNav={setPage} navItems={NAV_ITEMS_FULL} />
      {renderPage()}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#04080F' },
});
