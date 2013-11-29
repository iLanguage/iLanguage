(function(exports) {

  exports.newiLanguageCloud = function(userOptions) {

    var self = this;
    self.element             = userOptions.cloudDiv;

    var textToTurnIntoACloud = userOptions.cloudText,
        cloudStopWords       = userOptions.cloudStopWords,
        userChosenFontFace   = userOptions.cloudFont,
        isAndroid            = userOptions.isAndroid;

    //accept a dom element, or an id
    if(self.element.offsetWidth == undefined){
      self.element = document.getElementById(self.element);
    }

    if(self.element.length){
      self.element = self.element[0];
    }

    /**
     * D3 word cloud by Jason Davies see http://www.jasondavies.com/wordcloud/ for more details
     */

    var fill = d3.scale.category20(),
      w = self.element.offsetWidth || 600,
      h = window.innerHeight || 400;

    var words = [],
      max,
      scale = 1,
      complete = 0,
      keyword = '',
      tags,
      fontSize,
      maxLength = 30,
      fetcher = textToTurnIntoACloud,
      statusText = '';

    var layout = d3.layout.cloud()
      .timeInterval(10)
      .size([w, h])
      .fontSize(function(d) {
        return fontSize(+d.value);
      })
      .text(function(d) {
        return d.key;
      })
      .on('word', progress)
      .on('end', draw);

    var svg = d3.select(self.element).append('svg')
      .attr('width', w)
      .attr('height', h)
      .attr('version', '1.1')
      .attr('xmlns', 'http://www.w3.org/2000/svg');

    var background = svg.append('g'),
      vis = svg.append('g').attr('transform', 'translate(' + [w >> 1, h >> 1] + ')');

    d3.select(window).on('hashchange', hashchange);
    d3.select(window).on('load', hashchange);

    // From Jonathan Feinberg's cue.language, see lib/cue.language/license.txt.
    var stopWords = /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)$/,
      punctuation = /[!"&()*+,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
      wordSeparators = /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,
      discard = /^(@|https?:)/,
      htmlTags = /(<[^>]*?>|<script.*?<\/script>|<style.*?<\/style>|<head.*?><\/head>)/g;

    function parseText(text) {
      tags = {};
      var cases = {};

      text.split(wordSeparators).forEach(function(word) {
        if (discard.test(word)) { return };
        word = word.replace(punctuation, '');

        if (stopWords.test(word.toLowerCase())) { return };
        word = word.substr(0, maxLength);

        cases[word.toLowerCase()] = word;
        tags[word = word.toLowerCase()] = (tags[word] || 0) + 1;
      });

      tags = d3.entries(tags).sort(function(a, b) {
        return b.value - a.value;
      });

      tags.forEach(function(d) {
        d.key = cases[d.key];
      });

      generate();
    }

    function generate() {
      layout.font(userChosenFontFace).spiral('archimedean');
      fontSize = d3.scale.linear().range([10, 60]);

      if (tags.length) {
        fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
      }

      complete = 0;
      words = [];
      layout.stop().words(tags.slice(0, max = Math.min(tags.length, +150))).start();
    }

    function progress(d) {}

    function draw(data, bounds) {
      scale = bounds ? Math.min(
        w / Math.abs(bounds[1].x - w / 2),
        w / Math.abs(bounds[0].x - w / 2),
        h / Math.abs(bounds[1].y - h / 2),
        h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;
      words = data;
      var text = vis.selectAll('text')
        .data(words, function(d) {
          return d.text.toLowerCase();
        });
      text.transition()
        .duration(1000)
        .attr('transform', function(d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
        })
        .style('font-size', function(d) {
          return d.size + 'px';
        });

      // Use transitions for in-browser effect only if we're not
      // on our Android webview.
      if (!isAndroid) {
        text.enter().append('text')
          .attr('text-anchor', 'middle')
          .attr('transform', function(d) {
            return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
          })
          .style('font-size', function(d) {
            return d.size + 'px';
          })
          .style('opacity', 1e-6)
          .transition()
          .duration(500)
          .style('opacity', 1);
      } else {
        text.enter().append('text')
          .attr('text-anchor', 'middle')
          .attr('transform', function(d) {
            return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
          })
          .style('opacity', 1)
          .style('font-size', function(d) {
            return d.size + 'px';
          });
      }

      text.style('font-family', function(d) {
        return d.font;
      })
        .style('fill', function(d) {
          return fill(d.text.toLowerCase());
        })
        .text(function(d) {
          return d.text;
        });

      // Use transitions for in-browser effect only if we're not
      // on our Android webview.
      if (!isAndroid) {
        vis.transition()
          .duration(1000)
          .attr('transform', 'translate(' + [w >> 1, h >> 1] + ')scale(' + scale + ')')
          .each('end', function() {
            setSVG();
            setPNG();
          });
      } else {
        vis.transition()
          .duration(3000)
          .each('end', function() {
            setSVG();
            setPNG();
          });
      }
    }

    function hashchange() {
      load(fetcher);
    }

    function load(f) {
      parseText(f);
    }

    // Converts a given word cloud to image/png.
    function setPNG() {
      var canvas = document.createElement('canvas'),
        c = canvas.getContext('2d');
      canvas.width = w;
      canvas.height = h;
      c.translate(w >> 1, h >> 1);
      c.scale(scale, scale);
      words.forEach(function(word, i) {
        c.save();
        c.translate(word.x, word.y);
        c.rotate(word.rotate * Math.PI / 180);
        c.textAlign = 'center';
        c.fillStyle = fill(word.text.toLowerCase());
        c.font = word.size + 'px ' + word.font;
        c.fillText(word.text, 0, 0);
        c.restore();
      });
      var currentPNG = canvas.toDataURL('image/png');
      var currentPNGdata = currentPNG.match(/[^,]*$/)[0];
      localStorage.setItem('currentPNG', currentPNG);
      localStorage.setItem('currentPNGdata', currentPNGdata);
    }

    function setSVG() {
      var currentSVG = d3.select('svg');
      var currentSVGEscaped = btoa(unescape(encodeURIComponent(currentSVG.node().parentNode.innerHTML)));
      var currentSVGOut = 'data:image/svg+xml;charset=utf-8;base64,' + currentSVGEscaped;

      localStorage.setItem('currentSVG', currentSVGOut);
      localStorage.setItem('currentSVGdata', currentSVGEscaped);
    }

    var r = 40.5,
      px = 35,
      py = 20;

    var angles = d3.select('#angles').append('svg')
      .attr('width', 2 * (r + px))
      .attr('height', r + 1.5 * py)
      .append('g')
      .attr('transform', 'translate(' + [r + px, r + py] + ')');

    angles.append('path')
      .style('fill', 'none')
      .attr('d', ['M', -r, 0, 'A', r, r, 0, 0, 1, r, 0].join(' '));

    angles.append('line')
      .attr('x1', -r - 7)
      .attr('x2', r + 7);

    angles.append('line')
      .attr('y2', -r - 7);

    angles.selectAll('text')
      .data([-90, 0, 90])
      .enter().append('text')
      .attr('dy', function(d, i) {
        return i === 1 ? null : '.3em';
      })
      .attr('text-anchor', function(d, i) {
        return ['end', 'middle', 'start'][i];
      })
      .attr('transform', function(d) {
        d += 90;
        return 'rotate(' + d + ')translate(' + -(r + 10) + ')rotate(' + -d + ')translate(2)';
      })
      .text(function(d) {
        return d + '°';
      });

    var radians = Math.PI / 180,
      from,
      to,
      count,
      scale = d3.scale.linear(),
      arc = d3.svg.arc()
        .innerRadius(0)
        .outerRadius(r);

    getAngles();

    function getAngles() {
      count = +2;
      from = Math.max(-90, Math.min(90, +0));
      to = Math.max(-90, Math.min(90, +90));
      update();
    }

    function update() {
      scale.domain([0, count - 1]).range([from, to]);
      var step = (to - from) / count;

      var path = angles.selectAll('path.angle')
        .data([{
          startAngle: from * radians,
          endAngle: to * radians
        }]);
      path.enter().insert('path', 'circle')
        .attr('class', 'angle')
        .style('fill', '#fc0');
      path.attr('d', arc);

      var line = angles.selectAll('line.angle')
        .data(d3.range(count).map(scale));
      line.enter().append('line')
        .attr('class', 'angle');
      line.exit().remove();
      line.attr('transform', function(d) {
        return 'rotate(' + (90 + d) + ')';
      })
        .attr('x2', function(d, i) {
          return !i || i === count - 1 ? -r - 5 : -r;
        });

      var drag = angles.selectAll('path.drag')
        .data([from, to]);

      drag.enter().append('path')
        .attr('class', 'drag')
        .attr('d', 'M-9.5,0L-3,3.5L-3,-3.5Z')
        .call(d3.behavior.drag()
          .on('drag', function(d, i) {
            d = (i ? to : from) + 90;
            var start = [-r * Math.cos(d * radians), -r * Math.sin(d * radians)],
              m = [d3.event.x, d3.event.y],
              delta = ~~ (Math.atan2(cross(start, m), dot(start, m)) / radians);
            d = Math.max(-90, Math.min(90, d + delta - 90)); // remove this for 360°
            delta = to - from;
            if (i) {
              to = d;
              if (delta > 360) {
                from += delta - 360;
              } else if (delta < 0) {
                from = to;
              }
            } else {
              from = d;
              if (delta > 360) {
                to += 360 - delta;
              } else if (delta < 0) {
                to = from;
              }
            }
            update();
          })
          .on('dragend', generate));

      drag.attr('transform', function(d) {
        return 'rotate(' + (d + 90) + ')translate(-' + r + ')';
      });

      layout.rotate(function() {
        var value = scale(~~(Math.random() * count));
        return value;
      });
    }

    function cross(a, b) {
      return a[0] * b[1] - a[1] * b[0];
    }

    function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1];
    }

  };

}(typeof exports === 'object' && exports || this));
