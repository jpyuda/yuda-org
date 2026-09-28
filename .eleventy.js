module.exports = function(eleventyConfig) {
  // Copy assets through
  eleventyConfig.addPassthroughCopy("src/assets");

  // Projects and interests pages are unfinished and not linked from the
  // résumé homepage, so keep them out of the build for now. Remove these
  // two lines to publish them again.
  eleventyConfig.ignores.add("src/projects/**");
  eleventyConfig.ignores.add("src/interests/**");
  
  // Collections for different content types
  eleventyConfig.addCollection("interests", function(collection) {
    return collection.getFilteredByGlob("src/interests/*.md");
  });
  
  eleventyConfig.addCollection("projects", function(collection) {
    return collection.getFilteredByGlob("src/projects/*.md")
      .sort((a, b) => b.date - a.date);
  });
  
  eleventyConfig.addCollection("emerging", function(collection) {
    return collection.getFilteredByGlob("src/emerging/*.md");
  });
  
  eleventyConfig.addCollection("questions", function(collection) {
    return collection.getFilteredByGlob("src/questions/*.md");
  });
  
  eleventyConfig.addCollection("writing", function(collection) {
    return collection.getFilteredByGlob("src/writing/*.md")
      .sort((a, b) => b.date - a.date);
  });
  
  // Custom filters for the hypertext connections
  eleventyConfig.addFilter("getRelatedProjects", function(researchInterest, allProjects) {
    return allProjects.filter(project => 
      project.data.research_interests && 
      project.data.research_interests.includes(researchInterest)
    );
  });
  
  eleventyConfig.addFilter("getRelatedResearch", function(projectInterests, allResearch) {
    if (!projectInterests) return [];
    return allResearch.filter(research => 
      projectInterests.includes(research.fileSlug)
    );
  });
  
  eleventyConfig.addFilter("getBySlug", function(slug, collection) {
    return collection.find(item => item.fileSlug === slug);
  });
  
  eleventyConfig.addFilter("getProjectsByImpact", function(impactArea, allProjects) {
    return allProjects.filter(project => 
      project.data.impact_areas && 
      project.data.impact_areas.includes(impactArea)
    );
  });
  
  // Date filter for human-readable dates
  eleventyConfig.addFilter("readableDate", function(date) {
    // If it's already a string, just return it
    if (typeof date === 'string' && date.includes(',')) {
      return date;
    }
    
    // Otherwise, try to format it
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'
    });
  });

  // Resume dates are stored as "YYYY-MM" strings (or null for "present")
  // to keep the JSON sortable and unambiguous; these filters control how
  // they're displayed without touching the stored format. Parsed by hand
  // rather than via `new Date()` to sidestep timezone-shift bugs (see
  // readableDate above) — a plain "YYYY-MM" string has no timezone to
  // begin with, but there's no reason to introduce one.
  const MONTH_NAMES = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  eleventyConfig.addFilter("monthYear", function(value) {
    if (!value) return "Present";
    const [year, month] = value.split("-");
    return `${MONTH_NAMES[parseInt(month, 10) - 1]} ${year}`;
  });

  eleventyConfig.addFilter("yearOnly", function(value) {
    if (!value) return "Present";
    return value.split("-")[0];
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};