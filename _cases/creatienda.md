---
layout: case
title: Creatienda
subtitle: "multi-tenant SaaS refactor"
description: "Refactoring critical modules of a multi-tenant e-commerce SaaS into a service layer, and replacing a hard-coded checkout with a Factory-based multi-gateway integration. +20% response speed."
og_description: "Coupled modules, slow to respond. Refactored into a service layer: +20% response speed. And a Factory pattern so adding a payment provider stopped touching the checkout core."
permalink: /cases/creatienda/
lang: en
---

<div class="wrap">

  <!-- PORTADA -->
  <div class="lede">
    <span class="lede__idx" data-i18n="idx">[PRODUCT · LARAVEL · 2024 — NOW]</span>
    <h1 style="--title-ch:16">[Creatienda]</h1>
    <p class="lede__thesis" data-i18n-html="thesis">
      A system that was already alive, already had customers, and <em>could not stop</em>
      while I took it apart.
    </p>

    <dl class="facts">
      <div><dt data-i18n="f1t">what it is</dt><dd data-i18n="f1">Multi-tenant e-commerce SaaS</dd></div>
      <div><dt data-i18n="f2t">my role</dt><dd data-i18n="f2">Refactoring &amp; integrations</dd></div>
      <div><dt data-i18n="f3t">stack</dt><dd>Laravel · PHP · MySQL</dd></div>
      <div><dt data-i18n="f4t">period</dt><dd data-i18n="f4">2024 — now</dd></div>
      <div><dt data-i18n="f5t">outcome</dt><dd data-i18n="f5">+20% response speed</dd></div>
    </dl>
  </div>
</div>


<!-- 01 · WAIT -->
<div class="band"><span data-i18n="b1">Wait</span><small data-i18n="b1s">01 — the system as I found it</small></div>
<div class="wrap"><section class="state">
  <div class="state__grid">
    <div class="prose rise">
      <p data-i18n-html="w1">Creatienda is a <strong>multi-tenant e-commerce SaaS</strong> for small businesses across Latin America. Every store is a tenant; every tenant shares the same codebase and the same database cluster, isolated by <strong>Spatie Multitenancy</strong>.</p>
      <p data-i18n-html="w2">That architecture is the point and it is also the constraint. There is no window to take the system down, because taking it down takes down every store at once. Nothing here was a rewrite. Every change had to land on a system that kept selling while it changed.</p>
      <p class="pull" data-i18n="w3">One codebase, many stores. A mistake in the shared core is not one bug — it is every tenant's bug at the same time.</p>
      <h3 data-i18n="w4t">What I walked into</h3>
      <p data-i18n-html="w4">[Describe what already existed: how many tenants, what had been built before you, what the team looked like, what conventions were in place. This is the section that most people skip and it is the one that makes the rest legible.]</p>
    </div>

    <figure class="fig rise">
      <div class="fig__box f-tenant"><i></i></div>
      <figcaption data-i18n="fig1">Tenants share a core and never touch each other. The horizontal line is the shared code — the part where a mistake multiplies.</figcaption>
    </figure>
  </div>
</section></div>


<!-- 02 · FLY -->
<div class="band band--acid"><span data-i18n="b2">Fly</span><small data-i18n="b2s">02 — the symptom</small></div>
<div class="wrap"><section class="state">
  <div class="state__grid">
    <div class="prose rise">
      <p data-i18n-html="y1">Two symptoms, and they turned out to have the same shape.</p>
      <h3 data-i18n="y2t">Modules that had grown into each other</h3>
      <p data-i18n-html="y2">Business logic lived in controllers, and controllers knew about each other. Response times sagged under load, but the slowness was the visible part. The real cost was that <em>nobody could change one thing without reading four</em>.</p>
      <h3 data-i18n="y3t">A checkout that owned every provider</h3>
      <p data-i18n-html="y3">Payments in Latin America are not one integration, they are one per country: each provider with its own contract, its own credential shape, its own idea of what a successful response looks like. All of that had been added <strong>inside the checkout</strong>, one conditional at a time.</p>
      <p data-i18n-html="y4">So adding a country meant opening the single piece of code where money moves. That is the worst place in any system to be editing under deadline.</p>
      <p class="pull" data-i18n="y5">The slowness was not the bug. The slowness was the symptom of a system where everything knew about everything.</p>
    </div>

    <figure class="fig rise">
      <div class="fig__box f-coupled"><i></i></div>
      <figcaption data-i18n="fig2">Everything crossed with everything. This is what a change costs before the refactor: not the edit, the reading.</figcaption>
    </figure>
  </div>
</section></div>


<!-- 03 · CAUGHT -->
<div class="band"><span data-i18n="b3">Caught</span><small data-i18n="b3s">03 — the diagnosis and what I changed</small></div>
<div class="wrap"><section class="state">
  <div class="state__grid">
    <div class="prose rise">
      <h3 data-i18n="c1t">A service layer, module by module</h3>
      <p data-i18n-html="c1">Business logic moved out of controllers and into services with a single responsibility each. Controllers went back to what they are for: receiving a request, delegating, returning a response. The rule I held to was that <strong>no module lands unless the one before it is in production and stable</strong> — a big-bang refactor on a live multi-tenant system is not brave, it is reckless.</p>
      <p data-i18n-html="c2">[Name the specific modules you refactored and the order you did them in. The order is the interesting part: it shows you had a plan, not just an urge.]</p>

      <h3 data-i18n="c3t">A Factory for the gateways</h3>
      <p data-i18n-html="c3">Every provider now sits behind one interface. The checkout asks the factory for <em>a gateway</em>, not for a named provider, and it no longer knows or cares which one it gets.</p>

      <div class="code">
        <div class="code__head"><span>app/Services/Payments</span><span data-i18n="illus">illustrative</span></div>
<pre><b>interface</b> <u>PaymentGateway</u>
{
    <b>public function</b> charge(<u>Order</u> $order): <u>PaymentResult</u>;
    <b>public function</b> refund(<u>Payment</u> $payment): <u>PaymentResult</u>;
}

<b>class</b> <u>PaymentGatewayFactory</u>
{
    <i>/* One place knows the map. Adding a provider means adding
       a class and one line here — the checkout never opens. */</i>
    <b>protected array</b> $drivers = [
        <span>'</span>flow<span>'</span>       =&gt; <u>FlowGateway</u>::<b>class</b>,
        <span>'</span>webpay<span>'</span>     =&gt; <u>WebpayGateway</u>::<b>class</b>,
        <span>'</span>mercadopago<span>'</span> =&gt; <u>MercadoPagoGateway</u>::<b>class</b>,
    ];

    <b>public function</b> for(<u>Tenant</u> $tenant): <u>PaymentGateway</u>
    {
        $key = $tenant-&gt;payment_driver;

        <b>if</b> (! isset($this-&gt;drivers[$key])) {
            <b>throw new</b> <u>UnsupportedGatewayException</u>($key);
        }

        <b>return</b> app($this-&gt;drivers[$key]);
    }
}</pre>
      </div>

      <p data-i18n-html="c4">The shape matters more than the code: <strong>one place knows the map</strong>. Adding a provider is a new class plus one line in the factory. The checkout stays closed.</p>
      <p data-i18n-html="c5">[Add what was genuinely hard: reconciling different callback shapes, idempotency on retries, per-tenant credentials, sandbox vs production. That is what another engineer will recognise as real.]</p>
    </div>

    <figure class="fig rise">
      <div class="fig__box f-factory"><i></i></div>
      <figcaption data-i18n="fig3">One node, many outputs. The checkout only ever talks to the node.</figcaption>
    </figure>
  </div>
</section></div>


<!-- 04 · REOPEN -->
<div class="band band--acid"><span data-i18n="b4">Reopen</span><small data-i18n="b4s">04 — the result</small></div>
<div class="wrap"><section class="state">
  <div class="state__grid">
    <div class="prose rise">
      <p data-i18n-html="r1">The refactor to a service layer brought a <strong>20% improvement in response speed</strong>. That is the number I can put on it, and it is the least interesting part.</p>
      <p data-i18n-html="r2">What actually changed is the cost of the next change. A new payment provider stopped being an edit to the checkout and became a new file. A new module stopped requiring four files of reading before you could touch one.</p>
      <p class="pull" data-i18n="r3">The system did not get faster because I made the code pretty. It got faster because it stopped doing the same work in four places.</p>
      <p data-i18n-html="r4">[If you have any other measurable: error rate, deploy frequency, time-to-add-a-gateway before and after. One more number is worth three more paragraphs.]</p>

      <div class="metric">
        <div>
          <p class="metric__big">+20%</p>
          <p class="metric__lbl" data-i18n="m1">response speed after the service-layer refactor</p>
        </div>
        <div class="bars">
          <div><span><i data-i18n="m2">before</i></span><i style="width:100%"></i></div>
          <div class="after"><span><i data-i18n="m3">after</i></span><i style="width:80%"></i></div>
        </div>
      </div>
    </div>

    <figure class="fig rise">
      <div class="fig__box f-perf"><i></i></div>
      <figcaption data-i18n="fig4">The waterfall shortening. Same request, less work behind it.</figcaption>
    </figure>
  </div>
</section></div>


<div class="wrap">
  <nav class="next">
    <div>
      <small data-i18n="n1">Next case</small>
      <a href="/cases/otro/">[Multi-gateway]</a>
    </div>
    <div>
      <small data-i18n="n2">Or</small>
      <a href="/#contacto" data-i18n="n3">Send the stack trace →</a>
    </div>
  </nav>
</div>

<script>
window.__CASE_ES = {
  skip:"Saltar al contenido", allwork:"← todo el trabajo",
  idx:"[PRODUCTO · LARAVEL · 2024 — HOY]",
  thesis:"Un sistema que ya estaba vivo, ya tenía clientes y <em>no podía parar</em> mientras lo desarmaba.",
  f1t:"qué es",       f1:"SaaS multi-tenant de e-commerce",
  f2t:"mi rol",       f2:"Refactor e integraciones",
  f3t:"stack",
  f4t:"periodo",      f4:"2024 — hoy",
  f5t:"resultado",    f5:"+20 % de velocidad de respuesta",

  b1:"Espera",  b1s:"01 — el sistema como lo encontré",
  b2:"Vuela",   b2s:"02 — el síntoma",
  b3:"Muerde",  b3s:"03 — el diagnóstico y lo que cambié",
  b4:"Reabre",  b4s:"04 — el resultado",

  w1:"Creatienda es un <strong>SaaS multi-tenant de e-commerce</strong> para PyMEs de Latinoamérica. Cada tienda es un tenant; todos comparten la misma base de código y el mismo clúster de base de datos, aislados con <strong>Spatie Multitenancy</strong>.",
  w2:"Esa arquitectura es la gracia y también la restricción. No hay ventana para bajar el sistema, porque bajarlo baja todas las tiendas a la vez. Acá nada fue reescribir: cada cambio tenía que aterrizar sobre un sistema que seguía vendiendo mientras cambiaba.",
  w3:"Una base de código, muchas tiendas. Un error en el núcleo compartido no es un bug: es el bug de todos los tenants al mismo tiempo.",
  w4t:"Con qué me encontré",
  w4:"[Describí lo que ya existía: cuántos tenants, qué habían construido antes que vos, cómo era el equipo, qué convenciones había. Es la sección que todo el mundo se saltea y la que hace legible el resto.]",
  fig1:"Los tenants comparten núcleo y no se tocan entre sí. La línea horizontal es el código común — la parte donde un error se multiplica.",

  y1:"Dos síntomas, y resultaron tener la misma forma.",
  y2t:"Módulos que habían crecido uno dentro del otro",
  y2:"La lógica de negocio vivía en los controladores, y los controladores se conocían entre sí. Los tiempos de respuesta caían bajo carga, pero la lentitud era la parte visible. El costo real era que <em>nadie podía cambiar una cosa sin leer cuatro</em>.",
  y3t:"Un checkout dueño de todos los proveedores",
  y3:"Cobrar en Latinoamérica no es una integración, es una por país: cada proveedor con su contrato, su forma de credencial y su propia idea de qué es una respuesta exitosa. Todo eso se había ido sumando <strong>dentro del checkout</strong>, un condicional por vez.",
  y4:"Así que sumar un país significaba abrir el único pedazo de código donde se mueve dinero. Es el peor sitio de cualquier sistema para estar editando contra reloj.",
  y5:"La lentitud no era el bug. La lentitud era el síntoma de un sistema donde todo sabía de todo.",
  fig2:"Todo cruzado con todo. Esto es lo que cuesta un cambio antes del refactor: no la edición, la lectura.",

  c1t:"Una capa de servicios, módulo por módulo",
  c1:"La lógica de negocio salió de los controladores y pasó a servicios con una sola responsabilidad cada uno. Los controladores volvieron a lo suyo: recibir, delegar, responder. La regla que sostuve fue que <strong>ningún módulo aterriza si el anterior no está en producción y estable</strong> — un refactor de golpe sobre un multi-tenant vivo no es valiente, es temerario.",
  c2:"[Nombrá los módulos concretos que refactorizaste y en qué orden. El orden es lo interesante: demuestra que había un plan y no un impulso.]",
  c3t:"Un Factory para las pasarelas",
  c3:"Cada proveedor pasó a vivir detrás de una interfaz común. El checkout le pide al factory <em>una pasarela</em>, no un proveedor con nombre, y deja de saber cuál le toca.",
  illus:"ilustrativo",
  c4:"La forma importa más que el código: <strong>un solo lugar conoce el mapa</strong>. Sumar un proveedor es una clase nueva más una línea en el factory. El checkout no se abre.",
  c5:"[Sumá lo que fue realmente difícil: conciliar formatos de callback distintos, idempotencia en los reintentos, credenciales por tenant, sandbox contra producción. Eso es lo que otro ingeniero reconoce como real.]",
  fig3:"Un nodo, muchas salidas. El checkout solo habla con el nodo.",

  r1:"El refactor a capa de servicios trajo una <strong>mejora del 20 % en la velocidad de respuesta</strong>. Es el número que puedo poner, y es lo menos interesante.",
  r2:"Lo que cambió de verdad es el costo del próximo cambio. Una pasarela nueva dejó de ser una edición al checkout y pasó a ser un archivo nuevo. Un módulo nuevo dejó de exigir cuatro archivos de lectura antes de poder tocar uno.",
  r3:"El sistema no se volvió más rápido porque el código quedara lindo. Se volvió más rápido porque dejó de hacer el mismo trabajo en cuatro sitios.",
  r4:"[Si tenés otra medida: tasa de errores, frecuencia de despliegue, cuánto tardabas en sumar una pasarela antes y después. Un número más vale por tres párrafos más.]",
  m1:"de velocidad de respuesta tras el refactor a capa de servicios",
  m2:"antes", m3:"después",
  fig4:"La cascada acortándose. La misma petición, menos trabajo detrás.",

  n1:"Siguiente caso", n2:"O bien", n3:"Traé el stack trace →",
  foot:"hecho a mano con html, css y gsap · sin plantillas",
  _btn:"EN", _aria:"Switch to English"
};
</script>
