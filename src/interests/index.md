---
title: "Areas of Interest"
layout: layouts/base.njk
slug: "index"
---

# Areas of Interest

My work focuses on four interconnected areas that shape how technology can better serve people and democratic institutions:

{% for interest in collections.interests %}
  {% if interest.data.slug != "index" %}
- [{{ interest.data.title }}]({{ interest.url }})
  {% endif %}
{% endfor %}

These areas overlap and reinforce each other - privacy-preserving systems enable more inclusive services, human-centered design improves public participation, and accessible services strengthen democratic engagement.
