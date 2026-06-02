import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet, Text, View, ScrollView,
  TouchableOpacity, useWindowDimensions, Image, TextInput, Platform,
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

// ─── Form endpoint ────────────────────────────────────────────────────────────
const FORMSPREE_URL = 'https://formspree.io/f/xaqzwejy';

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
  const { isDesktop, pad } = useLayout();
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

function Hero({ onNav, onCallMeBack }) {
  const { isDesktop, isTablet, pad } = useLayout();
  const H  = isDesktop ? 540 : isTablet ? 400 : 390;
  const FS = isDesktop ? 50  : isTablet ? 34  : 23;
  const LH = isDesktop ? 60  : isTablet ? 42  : 29;

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

      {/* Gradient fade: white → transparent over image's left edge */}
      <View
        pointerEvents="none"
        style={[{
          position: 'absolute',
          top: 0,
          left: isDesktop ? '54%' : '50%',
          width: isDesktop ? 160 : 70,
          height: H,
          zIndex: 3,
        }, Platform.OS === 'web' ? {
          background: 'linear-gradient(to right, white, transparent)',
        } : {}]}
      />

      {/* Heading + subtext — left side */}
      <View style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: isDesktop ? '54%' : '46%',
        paddingLeft: pad,
        paddingTop: isDesktop ? 72 : isTablet ? 36 : 20,
        paddingRight: isDesktop ? 48 : 8,
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
          marginBottom: isDesktop ? 14 : 8,
        }}>
          We Help It{'\n'}Move Faster.
        </Text>
        <Text style={{
          color: C.muted,
          fontSize: isDesktop ? 15 : isTablet ? 13 : 11,
          lineHeight: isDesktop ? 26 : isTablet ? 20 : 16,
        }}>
          From lead response to scheduling, customer follow-up, and internal admin—
          we build practical AI systems that save your team time, reduce repetitive work,
          and keep your business moving.
        </Text>
      </View>

      {/* CTA button + badge — text column width on desktop, full width on mobile */}
      <View style={{
        position: 'absolute',
        bottom: isDesktop ? 32 : 12,
        left: pad,
        ...(isDesktop ? { width: '52%' } : { right: pad }),
        zIndex: 10,
        gap: 10,
      }}>
        <TouchableOpacity
          onPress={() => onNav('contact')}
          style={[{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            borderRadius: 10,
            paddingHorizontal: isDesktop ? 22 : 16,
            paddingVertical: isDesktop ? 16 : 10,
          }, Platform.OS === 'web' && isDesktop
            ? { background: `linear-gradient(to right, ${C.green} 50%, transparent 100%)` }
            : { backgroundColor: C.green }
          ]}
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

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <TouchableOpacity
            onPress={onCallMeBack}
            style={{
              borderWidth: 1.5,
              borderColor: C.green,
              borderRadius: 10,
              paddingHorizontal: isDesktop ? 18 : 14,
              paddingVertical: isDesktop ? 12 : 9,
            }}
          >
            <Text style={{ color: C.green, fontWeight: '800', fontSize: isDesktop ? 15 : 13 }}>
              Call Me Back
            </Text>
          </TouchableOpacity>
          <Text style={{ color: C.muted, fontSize: 13 }}>No pressure. No obligations.</Text>
        </View>
      </View>

    </View>
  );
}

// ─── Where Businesses Lose Time ───────────────────────────────────────────────

// icon_reel.png: 1536×1024, 3 cols × 2 rows, each cell 512×512
function SpriteIcon({ col, row, size }) {
  const cell = 512, scale = size / cell;
  return (
    <View style={{ width: size, height: size, overflow: 'hidden' }}>
      <Image
        source={require('./assets/icon_reel.png')}
        style={{
          width: 1536 * scale,
          height: 1024 * scale,
          marginLeft: -(col * cell * scale),
          marginTop: -(row * cell * scale),
        }}
        resizeMode="stretch"
      />
    </View>
  );
}

const PAIN_POINTS = [
  { col: 0, row: 0, label: 'Leads go\nunanswered' },
  { col: 0, row: 1, label: 'Manual\nscheduling' },
  { col: 1, row: 0, label: 'Follow-ups\nfall through\nthe cracks' },
  { col: 1, row: 1, label: 'Repetitive\nadmin work' },
  { col: 2, row: 1, label: 'Important\ntasks get\ndelayed' },
];

function LoseTimeSection() {
  const { isDesktop, pad, w } = useLayout();
  const maxW = isDesktop ? w * 0.8 : w - pad * 2;
  return (
    <View style={{ backgroundColor: C.surface, paddingVertical: isDesktop ? 52 : 14, alignItems: 'center' }}>
      <View style={{ width: maxW }}>
        <Text style={{
          color: C.text,
          fontSize: isDesktop ? 30 : 17,
          fontWeight: '900',
          textAlign: 'center',
          marginBottom: isDesktop ? 36 : 10,
          letterSpacing: -0.3,
        }}>
          Where Small Businesses Lose Time
        </Text>

        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: isDesktop ? 12 : 4 }}>
          {PAIN_POINTS.map((p, i) => (
            <View key={i} style={{
              flex: 1,
              alignItems: 'center',
              paddingHorizontal: isDesktop ? 8 : 2,
              paddingVertical: isDesktop ? 16 : 8,
              borderWidth: 1,
              borderColor: C.border,
              borderRadius: isDesktop ? 14 : 8,
              backgroundColor: C.white,
              overflow: 'hidden',
            }}>
              <View style={{ height: isDesktop ? 120 : 72, justifyContent: 'flex-end', alignItems: 'center', marginBottom: isDesktop ? 8 : 6 }}>
                <SpriteIcon col={p.col} row={p.row} size={isDesktop ? 110 : 60} />
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
  const { isDesktop, pad, w } = useLayout();
  const maxW = isDesktop ? w * 0.8 : w - pad * 2;
  return (
    <View style={{ backgroundColor: C.white, paddingVertical: isDesktop ? 56 : 14, alignItems: 'center' }}>
      <View style={{ width: maxW }}>
      <Text style={{
        color: C.text,
        fontSize: isDesktop ? 30 : 17,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: isDesktop ? 40 : 12,
        letterSpacing: -0.3,
      }}>
        How It Works
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: maxW }}>
        {STEPS.map((s, i) => (
          <React.Fragment key={i}>
            <View style={{ flex: 1, alignItems: 'center', paddingHorizontal: isDesktop ? 8 : 4 }}>
              <View style={{
                width: isDesktop ? 72 : 58,
                height: isDesktop ? 72 : 58,
                borderRadius: isDesktop ? 36 : 29,
                backgroundColor: C.green,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 12,
              }}>
                <Text style={{ color: C.white, fontWeight: '900', fontSize: isDesktop ? 28 : 22 }}>
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
              <View style={{ paddingTop: isDesktop ? 26 : 20, paddingHorizontal: isDesktop ? 4 : 1 }}>
                <Text style={{ color: C.green, fontSize: isDesktop ? 20 : 10, fontWeight: '900' }}>→</Text>
              </View>
            )}
          </React.Fragment>
        ))}
      </View>
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
  const { isDesktop, pad } = useLayout();
  return (
    <View style={{ backgroundColor: C.dark, paddingHorizontal: isDesktop ? pad : 10, paddingVertical: isDesktop ? 56 : 16 }}>
      <Text style={{
        color: C.white,
        fontSize: isDesktop ? 30 : 15,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: 3,
        letterSpacing: -0.3,
      }}>
        Simple. Transparent. Results-Driven.
      </Text>
      <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: isDesktop ? 13 : 10, textAlign: 'center', marginBottom: isDesktop ? 32 : 10 }}>
        All engagements begin with the one-time Setup Fee.
      </Text>

      {/* Always 4 columns — compact on mobile */}
      <View style={{ flexDirection: 'row', gap: isDesktop ? 12 : 6, alignItems: 'stretch' }}>
        {PRICING.map((p, i) => (
          <View key={i} style={{
            flex: 1,
            backgroundColor: C.white,
            borderRadius: isDesktop ? 14 : 10,
            padding: isDesktop ? 24 : 10,
            alignItems: 'center',
            gap: isDesktop ? 5 : 3,
            borderWidth: p.featured ? 2 : 0,
            borderColor: p.featured ? C.green : 'transparent',
          }}>
            {/* Fixed-height badge row — keeps all cards' content vertically aligned */}
            <View style={{ height: isDesktop ? 22 : 16, alignItems: 'center', justifyContent: 'center' }}>
              {p.featured && (
                <View style={{
                  backgroundColor: C.green,
                  borderRadius: 999,
                  paddingHorizontal: isDesktop ? 10 : 6,
                  paddingVertical: 2,
                }}>
                  <Text style={{ color: C.white, fontSize: isDesktop ? 10 : 8, fontWeight: '900' }}>POPULAR</Text>
                </View>
              )}
            </View>
            <Text style={{ color: C.text, fontSize: isDesktop ? 18 : 12, fontWeight: '900', textAlign: 'center' }}>{p.name}</Text>
            <Text style={{ color: C.muted, fontSize: isDesktop ? 12 : 9, fontWeight: '600' }}>{p.sub}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 1 }}>
              <Text style={{ color: C.green, fontSize: isDesktop ? 28 : 16, fontWeight: '900', letterSpacing: -0.5 }}>
                {p.price}
              </Text>
              {p.per ? (
                <Text style={{ color: C.muted, fontSize: isDesktop ? 13 : 9, marginBottom: isDesktop ? 4 : 2 }}>{p.per}</Text>
              ) : null}
            </View>
            <Text style={{ color: C.muted, fontSize: isDesktop ? 13 : 9, textAlign: 'center', lineHeight: isDesktop ? 18 : 13 }}>
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
  const { isDesktop, pad } = useLayout();
  return (
    <View style={{ backgroundColor: C.surface, paddingHorizontal: isDesktop ? pad : 12, paddingVertical: isDesktop ? 56 : 16 }}>
      <Text style={{
        color: C.text,
        fontSize: isDesktop ? 30 : 17,
        fontWeight: '900',
        textAlign: 'center',
        marginBottom: isDesktop ? 36 : 12,
        letterSpacing: -0.3,
      }}>
        Why <Text style={{ color: C.green }}>SmartBizAi</Text>?
      </Text>

      {/* Always 3-across, even on mobile */}
      <View style={{ flexDirection: 'row', gap: isDesktop ? 16 : 6 }}>
        {WHY.map((w, i) => (
          <View key={i} style={{
            flex: 1,
            alignItems: 'center',
            paddingHorizontal: isDesktop ? 20 : 4,
            gap: isDesktop ? 10 : 5,
          }}>
            <Text style={{ fontSize: isDesktop ? 42 : 26 }}>{w.icon}</Text>
            <Text style={{
              color: C.text,
              fontSize: isDesktop ? 16 : 11,
              fontWeight: '800',
              textAlign: 'center',
            }}>
              {w.title}
            </Text>
            <Text style={{
              color: C.muted,
              fontSize: isDesktop ? 14 : 10,
              textAlign: 'center',
              lineHeight: isDesktop ? 22 : 14,
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
  const [form, setForm]     = useState({ name: '', business: '', contact: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [formError, setFormError] = useState('');

  async function handleSubmit() {
    if (!form.contact.trim()) {
      setFormError('Please enter a phone number or email so we can reach you.');
      return;
    }
    setFormError('');
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:     form.name     || '(not provided)',
          business: form.business || '(not provided)',
          contact:  form.contact,
          message:  form.message  || '(not provided)',
          _subject: 'Free Call Request — SmartBizAi',
        }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setFormError(data?.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setFormError('Network error. Please try again.');
    }
  }

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
        {status === 'success' ? (
          <View style={{
            backgroundColor: C.greenBg,
            borderWidth: 1.5,
            borderColor: C.green,
            borderRadius: 12,
            padding: 28,
            alignItems: 'center',
            gap: 8,
          }}>
            <Text style={{ color: C.green, fontSize: 20, fontWeight: '900' }}>Request Sent!</Text>
            <Text style={{ color: C.mid, fontSize: 15, textAlign: 'center', lineHeight: 24 }}>
              We received your message and will be in touch shortly.
            </Text>
          </View>
        ) : (
          <>
            {[
              { key: 'name',     placeholder: 'Your name' },
              { key: 'business', placeholder: 'Business name' },
              { key: 'contact',  placeholder: 'Phone or email *' },
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
            {!!formError && (
              <Text style={{ color: '#DC2626', fontSize: 13 }}>{formError}</Text>
            )}
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: C.green,
                borderRadius: 10,
                paddingVertical: 16,
                alignItems: 'center',
                marginTop: 4,
              }}
            >
              <Text style={{ color: C.white, fontWeight: '900', fontSize: 16 }}>
                {status === 'sending' ? 'Sending…' : 'Book a Free 5-Minute Call'}
              </Text>
            </TouchableOpacity>
          </>
        )}
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

// ─── Call Me Back Modal ───────────────────────────────────────────────────────

function CallMeBackModal({ visible, onClose }) {
  const [form, setForm]     = useState({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError]   = useState('');

  function reset() {
    setForm({ name: '', phone: '', email: '' });
    setStatus('idle');
    setError('');
  }

  async function handleSubmit() {
    if (!form.phone.trim() && !form.email.trim()) {
      setError('Please enter a phone number or email so we can reach you.');
      return;
    }
    setError('');
    setStatus('sending');
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name:     form.name  || '(not provided)',
          phone:    form.phone || '(not provided)',
          email:    form.email || '(not provided)',
          _subject: 'Call Me Back Request — SmartBizAi',
        }),
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setStatus('error');
        setError(data?.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setError('Network error. Please try again.');
    }
  }

  if (!visible) return null;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => { reset(); onClose(); }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.55)',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
      }}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {}}
        style={{
          backgroundColor: C.white,
          borderRadius: 20,
          borderWidth: 1.5,
          borderColor: C.border,
          padding: 32,
          width: 420,
          maxWidth: '92%',
          gap: 14,
          shadowColor: '#000',
          shadowOpacity: 0.15,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 8 },
        }}
      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Text style={{ color: C.text, fontSize: 22, fontWeight: '900' }}>Request a Call Back</Text>
          <TouchableOpacity onPress={() => { reset(); onClose(); }} style={{ padding: 4 }}>
            <Text style={{ color: C.muted, fontSize: 26, lineHeight: 28 }}>×</Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: C.muted, fontSize: 14, lineHeight: 22 }}>
          Leave your number and/or email — we will be in touch shortly.
        </Text>

        {status === 'success' ? (
          <>
            <View style={{
              backgroundColor: C.greenBg,
              borderWidth: 1.5,
              borderColor: C.green,
              borderRadius: 12,
              padding: 24,
              alignItems: 'center',
              gap: 8,
              marginTop: 8,
            }}>
              <Text style={{ color: C.green, fontSize: 20, fontWeight: '900' }}>Got it!</Text>
              <Text style={{ color: C.mid, fontSize: 14, textAlign: 'center', lineHeight: 22 }}>
                We received your request and will reach out soon.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => { reset(); onClose(); }}
              style={{
                borderWidth: 1.5, borderColor: C.border, borderRadius: 10,
                paddingVertical: 13, alignItems: 'center', marginTop: 4,
              }}
            >
              <Text style={{ color: C.mid, fontWeight: '700', fontSize: 15 }}>Close</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {[
              { key: 'name',  placeholder: 'Your name (optional)', type: 'default' },
              { key: 'phone', placeholder: 'Phone number',         type: 'phone-pad' },
              { key: 'email', placeholder: 'Email address',        type: 'email-address' },
            ].map(field => (
              <TextInput
                key={field.key}
                placeholder={field.placeholder}
                placeholderTextColor={C.muted}
                value={form[field.key]}
                onChangeText={v => setForm(f => ({ ...f, [field.key]: v }))}
                keyboardType={field.type}
                autoCapitalize="none"
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
            {!!error && (
              <Text style={{ color: '#DC2626', fontSize: 13, marginTop: -4 }}>{error}</Text>
            )}
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: C.green,
                borderRadius: 10,
                paddingVertical: 15,
                alignItems: 'center',
                marginTop: 4,
              }}
            >
              <Text style={{ color: C.white, fontWeight: '900', fontSize: 15 }}>
                {status === 'sending' ? 'Sending…' : 'Send Request'}
              </Text>
            </TouchableOpacity>
            <Text style={{ color: C.muted, fontSize: 11, textAlign: 'center' }}>
              We will never share your contact details.
            </Text>
          </>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const { width } = useWindowDimensions();
  const [, setPage]                         = useState('home');
  const [callMeBackOpen, setCallMeBackOpen] = useState(false);

  return (
    <View style={[styles.root, { width, overflow: 'hidden' }]}>
      <StatusBar style="dark" />
      <Navbar onNav={setPage} />
      <ScrollView style={{ flex: 1, width }} showsVerticalScrollIndicator={false} contentContainerStyle={{ width, overflow: 'hidden' }}>
        <Hero onNav={setPage} onCallMeBack={() => setCallMeBackOpen(true)} />
        <LoseTimeSection />
        <HowItWorksSection />
        <PricingSection />
        <WhySection />
        <ContactSection />
        <Footer />
      </ScrollView>
      <StickyBar onNav={setPage} />
      <CallMeBackModal visible={callMeBackOpen} onClose={() => setCallMeBackOpen(false)} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
});
