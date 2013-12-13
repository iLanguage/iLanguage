/*
 * ilanguagecloud
 * https://github.com/iLanguage/iLanguageCloud
 *
 * Copyright (c) 2013
 * Licensed under the MIT license.
 */
var layoutCloud = require('layoutCloud');
var StopWords = require('./stop-words');

(function(exports) {

  var WordCloud = function(options) {

    var defaults = {
      element: 'cloud',
      text: 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk with Longe and Parole and dragged her into their agency, where they abused her for their projects again and again. And if she hasn’t been rewritten, then they are still using her.Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksgrove, the headline of Alphabet Village and the subline of her own road, the Line Lane. Pityful a rethoric question ran over her cheek, then she continued her way. On her way she met a copy. The copy warned the Little Blind Text, that where it came from it would have been rewritten a thousand times and everything that was left from its origin would be the word "and" and the Little Blind Text should turn around and return to its own, safe country. But nothing the copy said could convince her and so it didn’t take long until a few insidious Copy Writers ambushed her, made her drunk',
      font: 'FreeSans',
      isAndroid: false,
      stopWords: StopWords.defaults.english
    };

    var cloud = options || {};

    for (var opt in defaults) {
      cloud[opt] = (opt in cloud) ? cloud[opt] : defaults[opt];
    }

    if (cloud.stopWords !== defaults.stopWords) {
      try {
        cloud = StopWords.processStopWords(cloud);
      } catch (e) {
        cloud.stopWords = defaults.stopWords;
      }
    }

    cloud.render = function(userOptions) {

      userOptions = userOptions || this;

      var element = userOptions.element,
        textToTurnIntoACloud = userOptions.text,
        cloudStopWords = userOptions.stopWords,
        userChosenFontFace = userOptions.font,
        isAndroid = userOptions.isAndroid;

      //accept a dom element, or an id
      if (element.offsetWidth === undefined) {
        element = document.getElementById(element);
      }

      if (element.length) {
        element = element[0];
      }

      // D3 word cloud by Jason Davies see http://www.jasondavies.com/wordcloud/ for more details
      var fill = d3.scale.category20(),
        w = element.offsetWidth || 600,
        h = window.innerHeight || 400,
        words = [],
        max,
        scale = 1,
        tags,
        fontSize,
        maxLength = 30,
        fetcher = textToTurnIntoACloud,
        stopWords = cloudStopWords,
        punctuation = /[!"&()*+,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
        wordSeparators = /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,
        discard = /^(@|https?:)/;

      var layout = d3.layout.cloud()
        .timeInterval(10)
        .size([w, h])
        .fontSize(function(d) {
          return fontSize(+d.value);
        })
        .text(function(d) {
          return d.key;
        })
        .on('end', draw);

      var svg = d3.select(element).append('svg')
        .attr('width', w)
        .attr('height', h)
        .attr('version', '1.1')
        .attr('xmlns', 'http://www.w3.org/2000/svg');

      var background = svg.append('g'),
        vis = svg.append('g').attr('transform', 'translate(' + [w >> 1, h >> 1] + ')');

      function generate() {
        layout.font(userChosenFontFace).spiral('archimedean');
        fontSize = d3.scale.linear().range([10, h * 0.25]);

        if (tags.length) {
          fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
        }

        words = [];
        layout.stop().words(tags.slice(0, max = Math.min(tags.length, +250))).start();
      }

      function parseText(text) {
        tags = {};
        var cases = {};

        text.split(wordSeparators).forEach(function(word) {
          if (discard.test(word)) { return; }
          word = word.replace(punctuation, '');

          if (stopWords.test(word.toLowerCase())) { return; }
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

      function hashchange() {
        parseText(fetcher);
      }

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
            .attr('transform', 'translate(' + [w >> 1, h >> 1] + ')scale(' + scale + ')');
            // .each('end', function() {
            //   setSVG();
            //   setPNG();
            // });
        } else {
          vis.transition()
            .duration(3000);
            // .each('end', function() {
            //   setSVG();
            //   setPNG();
            // });
        }
      }

      // Converts a given word cloud to image/png.
      // function setPNG() {
      //   var canvas = document.createElement('canvas'),
      //     c = canvas.getContext('2d');
      //   canvas.width = w;
      //   canvas.height = h;
      //   c.translate(w >> 1, h >> 1);
      //   c.scale(scale, scale);
      //   words.forEach(function(word, i) {
      //     c.save();
      //     c.translate(word.x, word.y);
      //     c.rotate(word.rotate * Math.PI / 180);
      //     c.textAlign = 'center';
      //     c.fillStyle = fill(word.text.toLowerCase());
      //     c.font = word.size + 'px ' + word.font;
      //     c.fillText(word.text, 0, 0);
      //     c.restore();
      //   });
      //   var currentPNG = canvas.toDataURL('image/png');
      //   var currentPNGdata = currentPNG.match(/[^,]*$/)[0];
      //   localStorage.setItem('currentPNG', currentPNG);
      //   localStorage.setItem('currentPNGdata', currentPNGdata);
      // }

      // function setSVG() {
      //   var currentSVG = d3.select('svg');
      //   var currentSVGEscaped = btoa(unescape(encodeURIComponent(currentSVG.node().parentNode.innerHTML)));
      //   var currentSVGOut = 'data:image/svg+xml;charset=utf-8;base64,' + currentSVGEscaped;

      //   localStorage.setItem('currentSVG', currentSVGOut);
      //   localStorage.setItem('currentSVGdata', currentSVGEscaped);
      // }

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
        arc = d3.svg.arc().innerRadius(0).outerRadius(r);

      scale = d3.scale.linear();

      function cross(a, b) { return a[0] * b[1] - a[1] * b[0]; }
      function dot(a, b) { return a[0] * b[0] + a[1] * b[1]; }

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
                delta = ~~(Math.atan2(cross(start, m), dot(start, m)) / radians);
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

      function getAngles() {
        count = +2;
        from = Math.max(-90, Math.min(90, +0));
        to = Math.max(-90, Math.min(90, +90));
        update();
      }

      getAngles();

      hashchange();
      return this;

    };

    return Object.create(cloud);

  };

  exports.WordCloud = WordCloud;
})(typeof exports === 'undefined' ? this['WordCloud'] = {} : exports);
