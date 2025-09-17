const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/img": "img" });
  eleventyConfig.addFilter("date", (value, format = "dd.LL.yyyy") => {
    if (!value) return "";
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });
  return {
    dir: {
      input: "src",
      includes: "includes",
      data: "_data",
      output: "_site",
    },
  };
};
