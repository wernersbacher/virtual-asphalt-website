---
title: Startseite
layout: base.njk
---

<h1>Willkommen bei Virtual Asphalt Simracing!</h1>
<p>Wir sind eine leidenschaftliche Simracing-Liga. Hier findest du alle Infos zu unseren Rennen, Regeln und mehr.</p>

<h2>Rennkalender</h2>
<ul class="rennkalender">
{% for event in rennkalender %}
  <li>
    <img src="{{ event.img }}" alt="{{ event.title }}">
    <div><strong>{{ event.title }}</strong></div>
    {% if event.desc %}
      <div style="color:#555; font-size:0.95em; margin-bottom:0.5em; white-space:pre-line;">{{ event.desc }}</div>
    {% endif %}
  </li>
{% endfor %}
</ul>
