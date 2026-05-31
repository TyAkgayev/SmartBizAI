import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
  TouchableOpacity, useWindowDimensions, Image, TextInput,
} from 'react-native';

// ─── Theme ───────────────────────────────────────────────────────────────────

const C = {
  bg:        '#FFFFFF',
  surface:   '#F4F7F4',
  dark:      '#0E1010',
  green:     '#1F7A3E',
  greenBright: '#22C55E',
  greenBg:   '#F0FDF4',
  greenDim:  'rgba(31,122,62,0.10)',
  text:      '#0F1010',
  mid:       '#374151',
  muted:     '#6B7280',
  border:    '#E5E7EB',
  white:     '#FFFFFF',
};

// ─── Layout ───────────────────────────────────────────────────────────────────

function useLayout() {
  const { width } = useWindowDimensions();
  return {
    isDesktop: width >= 1024,
    isTablet:  width >= 640,
    pad:       width >= 1024 ? 72 : width >= 640 ? 36 : 20,
    w:         width,
  };
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ onNav }) {
  const { isDesktop, isTablet, pad } = useLayout();
  const [open, setOpen] = useState(false);

  const links = [
    { label: 'How It Works', key: 'how-it-works' },
    { label: 'Services',     key: 'services' },
    { label: 'Why Us',       key: 'why-us' },
    { label: 'Contact',      key: 'contact' },
  ];

  return (
    <View>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: pad,
        paddingVertical: 16,
        backgroundColor: C.white,
        borderBottomWidth: 1,
        borderBottomColor: C.border,
      }}>
        <TouchableOpacity onPress={() => { onNav('home'); setOpen(false); }}>
          <Text style={{ fontSize: 22, fontWeight: '900', color: C.text, letterSpacing: -0.5 }}>
            SmartBiz<Text style={{ color: C.green }}>Ai</Text>
          </Text>
        </TouchableOpacity>

        {isDesktop ? (
          <View style={{ flexDirection: 'row', gap: 32, alignItems: 'center' }}>
            {links.map(l => (
              <TouchableOpacity key={l.key} onPress={() => onNav(l.key)}>
                <Text style={{ color: C.mid, fontSize: 15, fontWeight: '600' }}>{l.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              onPress={() => onNav('contact')}
              style={{ backgroundColor: C.green, borderRadius: 8, paddingHorizontal: 20, paddingVertical: 11 }}
            >
              <Text style={{ color: C.white, fontWeight: '800', fontSize: 15 }}>Book Free Call</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={() => setOpen(!open)} style={{ padding: 4 }}>
            <Text style={{ fontSize: 24, color: C.text, lineHeight: 26 }}>☰</Text>
          </TouchableOpacity>
        )}
      </View>

      {open && !isDesktop && (
        <View style={{
          backgroundColor: C.white,
          borderBottomWidth: 1,
          borderBottomColor: C.border,
          paddingHorizontal: pad,
          paddingBottom: 16,
        }}>
          {links.map(l => (
            <TouchableOpacity
              key={l.key}
              onPress={() => { onNav(l.key); setOpen(false); }}
              style={{ paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: C.border }}
            >
              <Text style={{ color: C.text, fontSize: 16, fontWeight: '600' }}>{l.label}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => { onNav('contact'); setOpen(false); }}
            style={{ backgroundColor: C.green, borderRadius: 9, paddingVertical: 14, alignItems: 'center', marginTop: 14 }}
          >
            <Text style={{ color: C.white, fontWeight: '800', fontSize: 15 }}>Book Free Call</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function Hero({ onNav }) {
  const { isDesktop, isTablet, pad } = useLayout();
  const H  = isDesktop ? 540 : isTablet ? 460 : 430;
  const FS = isDesktop ? 50  : isTablet ? 36  : 28;
  const LH = isDesktop ? 60  : isTablet ? 44  : 35;

  return (
    <View style={{ height: H, backgroundColor: C.white, overflow: 'hidden' }}>

      {/* Image — right half, full hero height */}
      <Image
        source={require('./assets/hero_mod.png')}
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: isDesktop ? '46%' : '50%',
          height: H,
        }}
        resizeMode="cover"
      />

      {/* Heading + subtext — left side */}
      <View style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: isDesktop ? '60%' : '58%',
        paddingLeft: pad,
        paddingTop: isDesktop ? 72 : isTablet ? 44 : 28,
        paddingRight: 10,
      }}>
        <Text style={{
          color: C.text,
          fontSize: FS,
          fontWeight: '900',
          lineHeight: LH,
          letterSpacing: -0.8,
        }}>
          Your Business{'\n'}Already Works.
        </Text>
        <Text style={{
          color: C.green,
          fontSize: FS,
          fontWeight: '900',
          lineHeight: LH,
          letterSpacing: -0.8,
          marginBottom: 14,
        }}>
          We Help It{'\n'}Move Faster.
        </Text>
        <Text style={{
          color: C.muted,
          fontSize: isDesktop ? 15 : isTablet ? 14 : 12,
          lineHeight: isDesktop ? 26 : 20,
        }}>
          From lead response to scheduling, customer follow-up, and internal admin—
          we build practical AI systems that save your team time, reduce repetitive work,
          and keep your business moving.
        </Text>
      </View>

      {/* CTA button + badge — full width at bottom, overlays image */}
      <View style={{
        position: 'absolute',
        bottom: isDesktop ? 32 : 22,
        left: pad,
        right: pad,
        zIndex: 10,
        gap: 10,
      }}>
        <TouchableOpacity
          onPress={() => onNav('contact')}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            backgroundColor: C.green,
            borderRadius: 10,
            paddingHorizontal: isDesktop ? 22 : 16,
            paddingVertical: isDesktop ? 16 : 14,
          }}
        >
          <Text style={{ fontSize: isDesktop ? 20 : 18, flexShrink: 0 }}>📅</Text>
          <View style={{ flex: 1 }}>
            <Text style={{ color: C.white, fontWeight: '900', fontSize: isDesktop ? 16 : 14 }}>
              Let's Talk About Your Business
            </Text>
            <Text style={{ color: 'rgba(255,255,255,0.78)', fontSize: isDesktop ? 13 : 11 }}>
              Book a Free 5-Minute Call
            </Text>
          </View>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
          <View style={{
            width: 18, height: 18, borderRadius: 9,
            backgroundColor: C.green,
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Text style={{ color: C.white, fontSize: 10, fontWeight: '900' }}>✓</Text>
          </View>
          <Text style={{ color: C.mid, fontSize: 13 }}>No pressure. No obligations.</Text>
        </View>
      </View>

    </View>
  );
}

// ─── Where Businesses Lose Time ───────────────────────────────────────────────

const PAIN_POINTS = [
  { icon: '💬', label: 'Leads go\nunanswered' },
  { icon: '📅', label: 'Manual\nscheduling' },
  { icon: '✉️', label: 'Follow-ups\nfall through\nthe cracks' },
  { icon: '📋', label: 'Repetitive\nadmin work' },
  { icon: '📊', label: 'Important\ntasks get\ndelayed' },
];

function LoseTimeSection() {
  const { isDesktop, pad } = useLayout();
  return (
    <View style={{ backgroundColor: C.surface, paddingHorizontal: pad, paddingVertical: 52 }}>
      <Text style={{
        color: C.text,
        fontSize: isDesktop ? 30 : 22,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 36,
        letterSpacing: -0.3,
      }}>
        Where Small Businesses Lose Time
      </Text>

      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        {PAIN_POINTS.map((p, i) => (
          <View key={i} style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: 8,
            paddingHorizontal: isDesktop ? 8 : 2,
          }}>
            <View style={{
              width: isDesktop ? 58 : 46,
              height: isDesktop ? 58 : 46,
              borderRadius: isDesktop ? 16 : 12,
              borderWidth: 1.5,
              borderColor: C.green,
              backgroundColor: C.greenBg,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
            }}>
              <Text style={{ fontSize: isDesktop ? 26 : 20 }}>{p.icon}</Text>
            </View>
            <Text style={{
              color: C.mid,
              fontSize: isDesktop ? 13 : 10,
              fontWeight: '600',
              textAlign: 'center',
              lineHeight: 15,
            }}>
              {p.label}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────

const STEPS = [
  { n: '1', title: 'We Meet',       body: 'You tell us how your business works today.' },
  { n: '2', title: 'We Listen',     body: 'We learn your processes and find the friction.' },
  { n: '3', title: 'We Build',      body: 'We design and build only what makes sense.' },
  { n: '4', title: 'You Save Time', body: 'Your team is faster, follow-up improves, and things run smoother.' },
];

function HowItWorksSection() {
  const { isDesktop, pad } = useLayout();
  return (
    <View style={{ backgroundColor: C.white, paddingHorizontal: pad, paddingVertical: 56 }}>
      <Text style={{
        color: C.text,
        fontSize: isDesktop ? 30 : 22,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 40,
        letterSpacing: -0.3,
      }}>
        How It Works
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {STEPS.map((s, i) => (
          <React.Fragment key={i}>
            <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: isDesktop ? 8 : 4 }}>
              <View style={{
                width: isDesktop ? 48 : 36,
                height: isDesktop ? 48 : 36,
                borderRadius: isDesktop ? 24 : 18,
                backgroundColor: C.green,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}>
                <Text style={{ color: C.white, fontWeight: '900', fontSize: isDesktop ? 20 : 16 }}>
                  {s.n}
                </Text>
              </View>
              <Text style={{
                color: C.text,
                fontSize: isDesktop ? 15 : 12,
                fontWeight: '800',
                textAlign: 'center',
                marginBottom: 6,
              }}>
                {s.title}
              </Text>
              <Text style={{
                color: C.muted,
                fontSize: isDesktop ? 13 : 10,
                textAlign: 'center',
                lineHeight: isDesktop ? 20 : 15,
              }}>
                {s.body}
              </Text>
            </View>

            {i < STEPS.length - 1 && (
              <View style={{ justifyContent: 'flex-start', paddingTop: isDesktop ? 12 : 8, paddingHorizontal: 2 }}>
                <Text style={{ color: C.green, fontSize: isDesktop ? 20 : 14, fontWeight: '900' }}>→</Text>
              </View>
            )}
          </React.Fragment>
        ))}
      </View>
    </View>
  );
}

// ─── Pricing ──────────────────────────────────────────────────────────────────

const PRICING = [
  {
    name:  'Setup Fee',
    sub:   'One-Time',
    icon:  '⚙️',
    price: '$1,499',
    per:   '',
    desc:  'Discovery, planning, and system setup.',
  },
  {
    name:  'Bronze',
    sub:   'Essential',
    icon:  '⭐',
    price: '$499',
    per:   '/mo',
    desc:  'Core automations for lead response and follow-up.',
  },
  {
    name:     'Silver',
    sub:      'Growth',
    icon:     '🏅',
    price:    '$999',
    per:      '/mo',
    desc:     'Multi-channel automation and scheduling.',
    featured: true,
  },
  {
    name:  'Gold',
    sub:   'Advanced',
    icon:  '👑',
    price: '$1,999',
    per:   '/mo',
    desc:  'Advanced systems, integrations, and ongoing optimization.',
  },
];

function PricingSection() {
  const { isDesktop, isTablet, pad } = useLayout();
  return (
    <View style={{ backgroundColor: C.dark, paddingHorizontal: pad, paddingVertical: 56 }}>
      <Text style={{
        color: C.white,
        fontSize: isDesktop ? 30 : 22,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 6,
        letterSpacing: -0.3,
      }}>
        Simple. Transparent. Results-Driven.
      </Text>
      <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13, textAlign: 'center', marginBottom: 32 }}>
        All engagements begin with the one-time Setup Fee.
      </Text>

      <View style={{
        flexDirection: isTablet ? 'row' : 'column',
        gap: 12,
        alignItems: isTablet ? 'stretch' : undefined,
      }}>
        {PRICING.map((p, i) => (
          <View key={i} style={{
            flex: isTablet ? 1 : undefined,
            backgroundColor: C.white,
            borderRadius: 14,
            padding: isDesktop ? 24 : 18,
            alignItems: 'center',
            gap: 5,
            borderWidth: p.featured ? 2 : 0,
            borderColor: p.featured ? C.green : 'transparent',
            position: 'relative',
          }}>
            {p.featured && (
              <View style={{
                backgroundColor: C.green,
                borderRadius: 999,
                paddingHorizontal: 10,
                paddingVertical: 3,
                marginBottom: 4,
              }}>
                <Text style={{ color: C.white, fontSize: 10, fontWeight: '900', letterSpacing: 0.5 }}>
                  MOST POPULAR
                </Text>
              </View>
            )}
            <Text style={{ color: C.text, fontSize: isDesktop ? 18 : 15, fontWeight: '900' }}>{p.name}</Text>
            <Text style={{ color: C.muted, fontSize: 12, fontWeight: '600' }}>{p.sub}</Text>
            <Text style={{ fontSize: isDesktop ? 30 : 24, marginVertical: 6 }}>{p.icon}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 2 }}>
              <Text style={{ color: C.green, fontSize: isDesktop ? 30 : 24, fontWeight: '900', letterSpacing: -0.5 }}>
                {p.price}
              </Text>
              {p.per ? (
                <Text style={{ color: C.muted, fontSize: 13, marginBottom: isDesktop ? 5 : 3 }}>{p.per}</Text>
              ) : null}
            </View>
            <Text style={{ color: C.muted, fontSize: isDesktop ? 13 : 11, textAlign: 'center', lineHeight: 18 }}>
              {p.desc}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20 }}>
        <View style={{
          width: 18, height: 18, borderRadius: 9,
          backgroundColor: C.green,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text style={{ color: C.white, fontSize: 10, fontWeight: '900' }}>✓</Text>
        </View>
        <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>Month-to-month. Cancel anytime.</Text>
      </View>
    </View>
  );
}

// ─── Why Us ───────────────────────────────────────────────────────────────────

const WHY = [
  { icon: '👥', title: 'Small & Family-Oriented', body: 'We care about our clients and treat your business like our own.' },
  { icon: '⚡', title: 'Nimble & Adaptable',      body: 'What we lack in size, we make up for with speed and agility.' },
  { icon: '🎯', title: 'Results-Driven',           body: 'We focus on what actually moves the needle.' },
];

function WhySection() {
  const { isDesktop, isTablet, pad } = useLayout();
  return (
    <View style={{ backgroundColor: C.surface, paddingHorizontal: pad, paddingVertical: 56 }}>
      <Text style={{
        color: C.text,
        fontSize: isDesktop ? 30 : 24,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 36,
        letterSpacing: -0.3,
      }}>
        Why <Text style={{ color: C.green }}>SmartBizAi</Text>?
      </Text>

      <View style={{
        flexDirection: isTablet ? 'row' : 'column',
        gap: isTablet ? 16 : 28,
      }}>
        {WHY.map((w, i) => (
          <View key={i} style={{
            flex: isTablet ? 1 : undefined,
            alignItems: 'center',
            paddingHorizontal: isDesktop ? 20 : 8,
            gap: 10,
          }}>
            <Text style={{ fontSize: isDesktop ? 42 : 36 }}>{w.icon}</Text>
            <Text style={{
              color: C.text,
              fontSize: isDesktop ? 16 : 15,
              fontWeight: '800',
              textAlign: 'center',
            }}>
              {w.title}
            </Text>
            <Text style={{
              color: C.muted,
              fontSize: isDesktop ? 14 : 13,
              textAlign: 'center',
              lineHeight: 22,
            }}>
              {w.body}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactSection() {
  const { isDesktop, pad } = useLayout();
  const [form, setForm] = useState({ name: '', business: '', contact: '', message: '' });

  return (
    <View style={{ backgroundColor: C.white, paddingHorizontal: pad, paddingVertical: 56 }}>
      <Text style={{
        color: C.text,
        fontSize: isDesktop ? 30 : 24,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: -0.3,
      }}>
        Let's Talk About Your Business
      </Text>
      <Text style={{
        color: C.muted, fontSize: 15, textAlign: 'center',
        lineHeight: 24, marginBottom: 32, maxWidth: 480, alignSelf: 'center',
      }}>
        No pressure. No tech jargon. Just a quick conversation about what's working,
        what's not, and whether we can help.
      </Text>

      <View style={{ maxWidth: 520, alignSelf: 'center', width: '100%', gap: 12 }}>
        {[
          { key: 'name',     placeholder: 'Your name' },
          { key: 'business', placeholder: 'Business name' },
          { key: 'contact',  placeholder: 'Phone or email' },
        ].map(f => (
          <TextInput
            key={f.key}
            placeholder={f.placeholder}
            placeholderTextColor={C.muted}
            value={form[f.key]}
            onChangeText={v => setForm(p => ({ ...p, [f.key]: v }))}
            style={{
              borderWidth: 1.5,
              borderColor: C.border,
              borderRadius: 10,
              padding: 14,
              fontSize: 15,
              color: C.text,
              backgroundColor: C.white,
            }}
          />
        ))}
        <TextInput
          placeholder="Briefly describe what feels slow or repetitive."
          placeholderTextColor={C.muted}
          value={form.message}
          onChangeText={v => setForm(p => ({ ...p, message: v }))}
          multiline
          numberOfLines={4}
          style={{
            borderWidth: 1.5,
            borderColor: C.border,
            borderRadius: 10,
            padding: 14,
            fontSize: 15,
            color: C.text,
            backgroundColor: C.white,
            minHeight: 110,
            textAlignVertical: 'top',
          }}
        />
        <TouchableOpacity style={{
          backgroundColor: C.green,
          borderRadius: 10,
          paddingVertical: 16,
          alignItems: 'center',
          marginTop: 4,
        }}>
          <Text style={{ color: C.white, fontWeight: '900', fontSize: 16 }}>Book a Free 5-Minute Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const { pad } = useLayout();
  return (
    <View style={{
      backgroundColor: C.dark,
      paddingHorizontal: pad,
      paddingVertical: 24,
      borderTopWidth: 1,
      borderTopColor: 'rgba(255,255,255,0.07)',
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 8,
    }}>
      <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>© 2026 SmartBizAi</Text>
      <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 13 }}>Practical AI systems for small business.</Text>
    </View>
  );
}

// ─── Sticky bottom bar ────────────────────────────────────────────────────────

function StickyBar({ onNav }) {
  return (
    <TouchableOpacity
      onPress={() => onNav('contact')}
      style={{
        backgroundColor: C.dark,
        paddingVertical: 16,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255,255,255,0.08)',
      }}
    >
      <Text style={{ color: C.white, fontWeight: '700', fontSize: 15 }}>
        Let's Talk About Your Business
      </Text>
      <Text style={{ color: C.green, fontSize: 18, fontWeight: '900' }}>→</Text>
    </TouchableOpacity>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [, setPage] = useState('home');

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <Navbar onNav={setPage} />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Hero onNav={setPage} />
        <LoseTimeSection />
        <HowItWorksSection />
        <PricingSection />
        <WhySection />
        <ContactSection />
        <Footer />
      </ScrollView>
      <StickyBar onNav={setPage} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
});
