module.exports = function(eleventyConfig) {
  // Copy assets through
  eleventyConfig.addPassthroughCopy("src/assets");
  
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
      day: 'numeric'
    });
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