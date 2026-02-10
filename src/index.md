---
title: "Home"
layout: layouts/base.njk
---

# John Yuda

I work at the intersection of technology and public service, focusing on systems that serve people rather than institutions.

## Areas of Interest

{% for interest in collections.interests %}
  {% if interest.data.slug != "index" %}
- [{{ interest.data.title }}]({{ interest.url }})
  {% endif %}
{% endfor %}

## Recent Work

{% for project in collections.projects %}
  {% if project.data.slug != "index" %}
- [{{ project.data.title }}]({{ project.url }})
  {% endif %}
{% endfor %}

## Publications

- [Federal Front Door Research Report](https://labs.usa.gov/files/FFD_ResearchReport.pdf) (2016)