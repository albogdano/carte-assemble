/*
 * handlebars-helper-mdpartial
 *
 * Alex Bogdanovski
 * https://github.com/albogdano/handlebars-helper-mdpartial
 *
 * Copyright (c) 2014
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({

    // Project metadata
    site: grunt.file.readJSON("assemble.json"),
    // Build HTML from templates and data
    assemble: {
      options: {
        flatten: true,
        layouts: "<%= site.layouts %>",
        layout: "<%= site.layout %>",
        plugins: ["assemble-partial-data", "<%= site.plugins %>/*.js"],
        helpers: ["handlebars-helper-mdpartial", "<%= site.helpers %>/*.js"],
        partials: ["<%= site.partials %>/*.{html,md}"],
        template: "<%= site.template %>",
        // Metadata
        pkg: {},
        site: "<%= site %>",
      },
      htmls: {
        files: {
          "<%= site.dest %>/": ["<%= site.templates %>/*.html"]
        }
      }
    },
    copy: {
      content: {
        files: [{
          flatten: true,
          expand: true,
          cwd: "<%= site.templates %>/",
          src: ["*.*"],
          dest: "<%= site.dest %>/"
        }]
      }
    },
    // Before generating new files remove files from previous build.
    clean: {
      dest: ["<%= site.dest %>/**"]
    }
  });

  // Load npm plugins to provide necessary tasks.
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("assemble");

  grunt.registerTask("default", ["clean","copy:content", "assemble"]);
};
