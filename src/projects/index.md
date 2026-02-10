---
title: "Recent Work"
layout: layouts/base.njk
slug: "index"
---

# Recent Work

<!-- My work focuses on four interconnected areas that shape how technology can better serve people and democratic institutions: -->

{% for projects in collections.project %}
  {% if project.data.slug != "index" %}
- [{{ project.data.title }}]({{ project.url }})
  {% endif %}
{% endfor %}

<!-- These areas overlap and reinforce each other - privacy-preserving systems enable more inclusive services, human-centered design improves public participation, and accessible services strengthen democratic engagement. -->
