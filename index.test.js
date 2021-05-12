"use strict";

const vows = require('vows');
const assert = require('assert');
const Remarkable = require('remarkable');

const plugin = require('./index.js');

const mdWithDollar = new Remarkable();
mdWithDollar.use(plugin);

const mdWithAt = new Remarkable();
mdWithAt.use(plugin, {delimiter: '@'});

vows.describe('KatexPlugin').addBatch({
  'Config empty delimiter': {
    topic() {
      const md = new Remarkable();
      md.use(plugin, {delimiter: ''});
      return md;
    },
    'Uses default delimiter': function(topic) {
      assert.equal(topic.renderer.rules.katex.delimiter, '$');
    }
  },
  'Multi-char delimiter': {
    topic() {
      return () => {
        const md = new Remarkable();
        md.use(plugin, {delimiter: '$$'});
        return md;
      };
    },
    'Throws exception': function(topic) {
      assert.throws(topic);
    }
  },
  'Render plain text': {
    topic: mdWithDollar.render('This is a test.'),
    'Nothing done': function(topic) {
      assert.equal(topic, '<p>This is a test.</p>\n');
    }
  },
  'Render with single $ in text': {
    topic: mdWithDollar.render('The car cost $20,000 new.'),
    'Nothing done': function(topic) {
      assert.equal(topic, '<p>The car cost $20,000 new.</p>\n');
    }
  },
  'Render $...$ in text': {
    topic: mdWithDollar.render('Equation $x + y$.'),
    'Starts with "<p>Equation "': function(topic) {
      assert.isTrue(topic.startsWith('<p>Equation '));
    },
    'Ends with ".</p>"': function(topic) {
      assert.isTrue(topic.endsWith('</span>.</p>\n'));
    },
    'Contains math span': function(topic) {
      assert.notEqual(topic.indexOf('<span class="katex">'), -1);
    }
  },
  'Render $...$ in text with embedded {$...$}': {
    topic: mdWithDollar.render('Equation $\\colorbox{aqua}{$F=ma$}$.'),
    'Starts with "<p>Equation "': function(topic) {
      assert.isTrue(topic.startsWith('<p>Equation '));
    },
    'Ends with ".</p>"': function(topic) {
      assert.isTrue(topic.endsWith('</span>.</p>\n'));
    },
    'Contains math span': function(topic) {
      assert.notEqual(topic.indexOf('<span class="katex">'), -1);
    }
  },
  'Render $...$ in text with embedded {': {
    topic: mdWithDollar.render('Equation $\\left\\{ hi \\right.$.'),
    'Starts with "<p>Equation "': function(topic) {
      assert.isTrue(topic.startsWith('<p>Equation '));
    },
    'Ends with ".</p>"': function(topic) {
      assert.isTrue(topic.endsWith('</span>.</p>\n'));
    },
    'Contains math span': function(topic) {
      assert.notEqual(topic.indexOf('<span class="katex">'), -1);
    }
  },
  'Render $...$ in text with embedded }': {
    topic: mdWithDollar.render('Equation $\\left\\{ hi \\right\\}$.'),
    'Starts with "<p>Equation "': function(topic) {
      assert.isTrue(topic.startsWith('<p>Equation '));
    },
    'Ends with ".</p>"': function(topic) {
      assert.isTrue(topic.endsWith('</span>.</p>\n'));
    },
    'Contains math span': function(topic) {
      assert.notEqual(topic.indexOf('<span class="katex">'), -1);
    }
  },
  'Render @...@ in text': {
    topic: mdWithAt.render('Equation @x + y@.'),
    'Starts with "<p>Equation "': function(topic) {
      assert.isTrue(topic.startsWith('<p>Equation '));
    },
    'Ends with ".</p>"': function(topic) {
      assert.isTrue(topic.endsWith('</span>.</p>\n'));
    },
    'Contains math span': function(topic) {
      assert.notEqual(topic.indexOf('<span class="katex">'), -1);
    }
  },
  'Render $$...$$ in text': {
    topic: mdWithDollar.render('Before\n$$\nx + y\n$$\nafter.'),
    'Starts with "<p>Before "': function(topic) {
      assert.isTrue(topic.startsWith('<p>Before\n'));
    },
    'Ends with "after.</p>"': function(topic) {
      assert.isTrue(topic.endsWith('</span>\nafter.</p>\n'));
    },
    'Contains math span': function(topic) {
      assert.notEqual(topic.indexOf('<span class="katex-display">'), -1);
    }
  },
  'Render @@...@@ in text': {
    topic: mdWithAt.render('Before @@x + y@@ after.'),
    'Starts with "<p>Before "': function(topic) {
      assert.isTrue(topic.startsWith('<p>Before '));
    },
    'Ends with "after.</p>"': function(topic) {
      assert.isTrue(topic.endsWith('</span> after.</p>\n'));
    },
    'Contains math span': function(topic) {
      assert.notEqual(topic.indexOf('<span class="katex-display">'), -1);
    }
  }
}).export(module);
