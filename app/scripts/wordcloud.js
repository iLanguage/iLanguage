var loadCloud = function(isAndroid, element, userChosenFontFace, textToTurnIntoACloud) {

  /**
   * D3 word cloud by Jason Davies see http://www.jasondavies.com/wordcloud/ for more details
   */

  console.log('This is our Android webview: ' + isAndroid);

  var fill = d3.scale.category20();
  // var w = element.width() || 600,
  var w = document.getElementById(element).offsetWidth || 600,
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

  var svg = d3.select('#' + element).append('svg')
    .attr('width', w)
    .attr('height', h)
    .attr('version', '1.1')
    .attr('xmlns', 'http://www.w3.org/2000/svg');

  var background = svg.append('g'),
    vis = svg.append('g')
      .attr('transform', 'translate(' + [w >> 1, h >> 1] + ')');

  d3.select(window).on('hashchange', hashchange);
  d3.select(window).on('load', hashchange);

  // From Jonathan Feinberg's cue.language, see lib/cue.language/license.txt.
  var stopWords = /^(i|me|my|myself|we|us|our|ours|ourselves|you|your|yours|yourself|yourselves|he|him|his|himself|she|her|hers|herself|it|its|itself|they|them|their|theirs|themselves|what|which|who|whom|whose|this|that|these|those|am|is|are|was|were|be|been|being|have|has|had|having|do|does|did|doing|will|would|should|can|could|ought|i'm|you're|he's|she's|it's|we're|they're|i've|you've|we've|they've|i'd|you'd|he'd|she'd|we'd|they'd|i'll|you'll|he'll|she'll|we'll|they'll|isn't|aren't|wasn't|weren't|hasn't|haven't|hadn't|doesn't|don't|didn't|won't|wouldn't|shan't|shouldn't|can't|cannot|couldn't|mustn't|let's|that's|who's|what's|here's|there's|when's|where's|why's|how's|a|an|the|and|but|if|or|because|as|until|while|of|at|by|for|with|about|against|between|into|through|during|before|after|above|below|to|from|up|upon|down|in|out|on|off|over|under|again|further|then|once|here|there|when|where|why|how|all|any|both|each|few|more|most|other|some|such|no|nor|not|only|own|same|so|than|too|very|say|says|said|shall)$/,
    punctuation = /[!"&()*+,-\.\/:;<=>?\[\\\]^`\{|\}~]+/g,
    wordSeparators = /[\s\u3031-\u3035\u309b\u309c\u30a0\u30fc\uff70]+/g,
    discard = /^(@|https?:)/,
    htmlTags = /(<[^>]*?>|<script.*?<\/script>|<style.*?<\/style>|<head.*?><\/head>)/g,
    matchTwitter = /^https?:\/\/([^\.]*\.)?twitter\.com/;

  function parseText(text) {
    tags = {};
    var cases = {};
    text.split(wordSeparators).forEach(function(word) {
      if (discard.test(word)) return;
      word = word.replace(punctuation, '');
      if (stopWords.test(word.toLowerCase())) return;
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
    layout
      .font(userChosenFontFace)
      .spiral('archimedean');
    fontSize = d3.scale.linear().range([10, 60]);
    if (tags.length) fontSize.domain([+tags[tags.length - 1].value || 1, +tags[0].value]);
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
            if (delta > 360) from += delta - 360;
            else if (delta < 0) from = to;
          } else {
            from = d;
            if (delta > 360) to += 360 - delta;
            else if (delta < 0) to = from;
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

  hashchange();
};

// var tempLoader = "<div id='loading' style='" +
//   'position:absolute;width:100px;height:50px;top:50%;left:50%;' +
//   'margin:-25px 0 0 -50px;text-align:center;font-family:sans-serif;' +
//   "font-weight:700;font-size:24px'>Rendering...</div>";
// $('body').append(tempLoader);

var userAgent = navigator.userAgent || '';
var userAgentTest = new RegExp(/iLanguageCloud/g);
// isAndroid is true only if we're inside our Android application.
// False for all other browsers.
var isAndroid = userAgentTest.test(userAgent);

// Parameters to pass. If isAndroid is true, use our Android JS functions.
// Otherwise, use our overrides.
var cloudFont = isAndroid === true ? window.jsinterface.getCloudFont() : 'FreeSans';
var cloudText = isAndroid === true ? window.jsinterface.getCloudString() : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod sapien metus, bibendum bibendum arcu interdum in. Maecenas aliquet, arcu scelerisque sodales aliquet, sapien lacus vestibulum risus, eget bibendum massa turpis eu eros. Integer a eros vehicula, fermentum eros vitae, lobortis diam. Pellentesque vitae consectetur ipsum, id viverra est. Nulla quis fringilla purus, ut pharetra nibh. Nunc adipiscing blandit dolor a tristique. Cras porttitor bibendum vestibulum. Vestibulum ornare, nunc feugiat iaculis blandit, velit ligula pretium leo, et rutrum quam lorem pretium nibh. Aliquam vel aliquam massa. Pellentesque odio tellus, pellentesque non diam eu, sodales euismod neque. Vivamus lacus lectus, imperdiet a blandit ac, varius eu metus. Praesent euismod enim eu nisi hendrerit, at accumsan urna cursus. Cras vestibulum cursus turpis, eget mollis lorem tristique vitae. Vivamus quam odio, mollis non egestas ac, aliquam at urna. Ut sed dolor sed ante ultrices sagittis eget id lectus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque a nulla in orci dignissim mattis. Nunc tristique est sed augue sollicitudin lacinia. Integer eleifend enim nec rhoncus luctus. Fusce ut nibh mollis, pellentesque risus id, feugiat arcu. Cras dapibus nunc gravida mauris cursus, porta elementum ante semper. Quisque eget magna eget orci luctus commodo. Donec ut ipsum rhoncus, blandit ligula in, ultricies justo. Etiam lobortis varius lobortis. Mauris blandit felis aliquet est volutpat, ac luctus lacus condimentum. Suspendisse ut lobortis urna, vel scelerisque nibh. Quisque venenatis risus ac lacinia bibendum. Nullam vel eros eget purus lacinia volutpat quis non metus. In purus risus, egestas vel laoreet vitae, viverra sit amet arcu. Pellentesque cursus velit non posuere venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam blandit metus quis posuere vehicula. Sed aliquam eget nisl id tincidunt. Phasellus quam nisl, ornare eget elementum in, tempor at ligula. Ut et dui mi. Quisque tincidunt rutrum elit. Duis quis consectetur ante, a venenatis ligula. Nullam vitae tempus diam, ac ultrices erat. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Curabitur at nibh malesuada, consectetur lorem ac, fermentum leo. Sed sit amet mauris ligula. Sed imperdiet pharetra lectus, sit amet faucibus nunc pharetra a. Sed vel vestibulum augue, lacinia aliquet nulla. Vivamus vel hendrerit nibh. Nam tempor non dolor vel posuere. Sed fringilla varius nisl eget pulvinar. Nullam nec imperdiet libero, nec vestibulum leo. Duis nisl magna, dictum eget ante a, faucibus mollis sapien. Aenean ac leo sit amet tortor blandit egestas. Mauris nec rhoncus odio. Curabitur vitae dui arcu. Nam aliquam quam risus, vel lobortis augue eleifend quis. Duis nulla dolor, bibendum eget justo sit amet, semper suscipit lacus. Sed consequat aliquam neque, eu cursus nunc facilisis ac. Vestibulum semper ullamcorper tortor et dictum. Suspendisse at consequat sem.';

