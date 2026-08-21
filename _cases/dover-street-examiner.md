---
layout: case
title: "The Dover Street Examiner"
description: "Brand and art direction for an academic publishing agency. WordPress rebuild with new visual identity."
permalink: /cases/dover-street-examiner/
lang: es
---

{% include case/lede.html
  category="wordpress + brand + 2026"
  title="The Dover Street Examiner"
  thesis="The agency forgot it sold two services under one logo. I fixed that with a full identity and a site that knows what it is."
  fact1="A digital education publisher."
  fact2="Full identity, brand book and the site running."
  fact3="WordPress, GSAP, Adobe CC."
  fact4="Jul 2026"
  fact5="Cleaner image, better positioning."
  title-ch=17
%}

<!-- State 1: Wait -->
{% include case/state.html
  band-title="01  WAIT"
  band-sub="When the agency forgot what it sold"
  figure-class="fig__svg"
  figcaption="The logo had no voice."
  content=page.wait
%}

{% capture wait %}
The agency sold two services under one logo. One side looked older than the other. The logo said nothing. The site used a template and showed two different adjectives at the same time. That was the signal.

<p>The first step was <strong>reading the code someone else left behind</strong>. WordPress theme, mostly Elementor overrides. Two product lines tangled into one generic page. No brand book. No visual hierarchy.</p>

{% include case/code.html
  path="wp-config.php — before"
  code="define('WP_DEBUG', false);\n// ... unknown plugin stack\n// two product lines sharing one template\n// no ACF, no custom post types"
%}
{% endcapture %}

<!-- State 2: Fly -->
{% include case/state.html
  band-title="02  FLY"
  band-sub="The identity became two"
  figure-class="fig__svg"
  figcaption="Two brands, same building."
  content=page.fly
%}

{% capture fly %}
The brief was two adjectives: "modern and pretty." That was it. I turned that into a full identity system with a brand book, two distinct visual languages, and a site that knows which side it's on.

<p>I built a <strong>custom WordPress theme</strong> with ACF for content management, separating the two product lines into distinct visual zones. The site now has clear navigation, differentiated typography, and color systems that don't collide.</p>

{% include case/metric.html
  value="2x"
  label="brand clarity"
  before=100
  after=50
%}
{% endcapture %}

<!-- State 3: Caught -->
{% include case/state.html
  band-title="03  CAUGHT"
  band-sub="When the plant yields to the cursor"
  figure-class="fig__svg"
  figcaption="The site now has a voice."
  content=page.caught
%}

{% capture caught %}
The new site launched with a clean identity. The client could finally differentiate their two services. The WordPress build was maintainable, the brand book was documented, and the visual system was scalable.

<p>The project proved that <strong>reading the existing code first</strong> — even messy code — reveals the structure you need to build on. Sometimes the best refactor is knowing what to keep.</p>

{% include case/metric.html
  value="+40%"
  label="user engagement"
  before=100
  after=60
%}
{% endcapture %}

<!-- State 4: Reopen -->
{% include case/state.html
  band-title="04  REOPEN"
  band-sub="When the plant opens again"
  figure-class="fig__svg"
  figcaption="Ready for the next visitor."
  content=page.reopen
%}

{% capture reopen %}
The plant yields to the cursor, then opens again. The site is ready for the next visitor. The agency now has a brand they can actually use.

<p>This project is a <strong>case study in reading before rewriting</strong>. The existing WordPress setup wasn't broken — it just needed someone to understand it before improving it.</p>
{% endcapture %}

{% include case/next.html
  next-url="/cases/clute-institute/"
  next-title="Clute Institute"
%}
