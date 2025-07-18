---
title: "Home"
layout: layouts/base.njk
---

# Research-Focused Practitioner

I work at the intersection of technology and public service, focusing on systems that serve people rather than institutions.

## Areas of Interest

{% for interest in collections.interests %}
  {% if interest.data.slug != "index" %}
- [{{ interest.data.title }}]({{ interest.url }})
  {% endif %}
{% endfor %}

## Recent Work

- [Vote.gov Language Expansion](/projects/vote-gov-languages/) (2021)

## Publications

- [Federal Front Door Research Report](https://labs.usa.gov/files/FFD_ResearchReport.pdf) (2016)