var loadCloud = function(scope, element, attr, userChosenFontFace, textToTurnIntoACloud) {

  /**
   * D3 word cloud by Jason Davies see http://www.jasondavies.com/wordcloud/ for more details
   */

  var fill = d3.scale.category20();
  var w = element.width() || 600,
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
    // fetcher = jsinterface.getCloudString(),
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

  var svg = d3.select(element[0]).append('svg')
    .attr('width', w)
    .attr('height', h);

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

  function parseHTML(d) {
    parseText(d.replace(htmlTags, ' ').replace(/&#(x?)([\dA-Fa-f]{1,4});/g, function(d, hex, m) {
      return String.fromCharCode(+((hex ? '0x' : '') + m));
    }).replace(/&\w+;/g, ' '));
  }

  function flatten(o, k) {
    if (typeof o === 'string') return o;
    var text = [];
    for (k in o) {
      var v = flatten(o[k], k);
      if (v) text.push(v);
    }
    return text.join(' ');
  }

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
    text.enter().append('text')
      .attr('text-anchor', 'middle')
      .attr('transform', function(d) {
        return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')';
      })
      .style('font-size', function(d) {
        return d.size + 'px';
      })
      .on('click', function(d) {
        $('#gsc-i-id1').val(d.text);
        $('input.gsc-search-button').click();
      })
      .style('opacity', 1e-6)
      .transition()
      .duration(1000)
      .style('opacity', 1);
    text.style('font-family', function(d) {
      return d.font;
    })
      .style('fill', function(d) {
        return fill(d.text.toLowerCase());
      })
      .text(function(d) {
        return d.text;
      });
    var exitGroup = background.append('g')
      .attr('transform', vis.attr('transform'));
    var exitGroupNode = exitGroup.node();
    text.exit().each(function() {
      exitGroupNode.appendChild(this);
    });
    exitGroup.transition()
      .duration(1000)
      .style('opacity', 1e-6)
      .remove();
    vis.transition()
      .delay(1000)
      .duration(750)
      .attr('transform', 'translate(' + [w >> 1, h >> 1] + ')scale(' + scale + ')');
  }

  function hashchange() {
    load(fetcher);
  }

  function load(f) {
    parseText(fetcher);
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

  d3.selectAll('#angle-count, #angle-from, #angle-to')
    .on('change', getAngles)
    .on('mouseup', getAngles);

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


var fonts = ['Trade Winds', 'Impact', 'Allura', 'Ewert', 'Ceviche One'];
var previousFont = localStorage.getItem('previousFont') || 0;
var currentFont = (parseInt(previousFont) + 1) % fonts.length;
localStorage.setItem('previousFont', currentFont);
console.log('Using font: ' + currentFont + ' ' + fonts[currentFont]);

var text = "A cloud is a visible mass of condensed droplets or frozen crystals suspended in the atmosphere. Cloud(s) may also refer to: Contents  [hide]  1 Information Technology 2 Science 3 Fiction 4 Literature 5 Music 6 Other uses 7 See also Information Technology  Cloud computing, Internet-based development and use of computer technology stored on servers rather than the client computers Cloud (operating system), a browser-based operating system that will instantly be usable after turning on the PC, by the makers of gOS Tag cloud, a visual depiction of user-generated tags used typically to describe the content of web sites Cloud storage, a model of networked online storage Cloud.com, a company that develops open source cloud orchestration software CloudStack, an open source cloud computing software Science  Magellanic Clouds, irregular dwarf galaxies near our galaxy, the Milky Way Interstellar cloud, dense region between stars Molecular cloud, interstellar cloud containing molecules Electron cloud, analogy used to describe an electron that orbits around a nucleus Point cloud, in mathematics, a set of vertices in a three-dimensional coordinate system CLOUD, an experimental facility used to investigate the microphysics between galactic cosmic rays and clouds Cloud chamber, an experimental device used in early studies of particle physics Fiction  Cloud Strife, a character in Final Fantasy VII media Bou Keng Wan ('Cloud'), a Kung Fu character from the Hong Kong comic, Fung Wan Cloud (comics), a Marvel comic book character Cloudbase, the fictional skyborne headquarters of Spectrum, from the science fiction television series Captain Scarlet and the Mysterons Clouds (film), a 2000 film written and directed by Don Thompson and produced by Will Arntz Literature  The Clouds, a comedy by Aristophanes Clouds, a 1977 philosophical comedic play by British playwright Michael Frayn The Clouds, a 1797 play by the British writer Richard Cumberland The Cloud of Unknowing, a medieval mystical text Music  Clouds (60s rock band), a Scottish music group that operated in the late 1960s Clouds (Australian band), an indie rock group based in Sydney, Australia in the 1990s The Clouds (UK band), a British indie pop band from the 1980s Cloud (music), sound mass consisting of statistical clouds of microsounds 'Clouds', a song by Chaka Khan from Naughty 'Clouds', a song by Level 42 on the album Retroglide 'Clouds', a song by Spires That in the Sunset Rise on the album This Is Fire 'Clouds' (Zach Sobiech song) a song by Zach Sobiech Clouds (Joni Mitchell album), 1969 Clouds (Lee Ranaldo album), 1997 Clouds (Tiamat album), 1992 Clouds (EP), an EP by Nosound 'Cloudy', by Average White Band from the album Cut the Cake Other uses  Cloud (dancer), a b-boy, writer, and director from Florida Cloud (surname) Cloud, California, a former settlement in Kings County Clodoald (522–560), better known as Cloud or Saint Cloud, son of King Chlodomer of Orleans Saint-Cloud, a commune in the western suburbs of Paris, France Cloud (video game), a 2005 third-person computer puzzle game See also  The Cloud (disambiguation) Cloud Nine (disambiguation) Red Cloud (disambiguation) St. Cloud (disambiguation) White Cloud (disambiguation) McCloud (disambiguation)";
var text2 = "Cloud computing, or the cloud, is a colloquial expression used to describe a variety of different types of computing concepts that involve a large number of computers connected through a real-time communication network such as the Internet.[1] Cloud computing is a term without a commonly accepted unequivocal scientific or technical definition. In science, cloud computing is a synonym for distributed computing over a network and means the ability to run a program on many connected computers at the same time. The phrase is also, more commonly used to refer to network-based services which appear to be provided by real server hardware, which in fact are served up by virtual hardware, simulated by software running on one or more real machines. Such virtual servers do not physically exist and can therefore be moved around and scaled up (or down) on the fly without affecting the end user - arguably, rather like a cloud. The popularity of the term can be attributed to its use in marketing to sell hosted services in the sense of application service provisioning that run client server software on a remote location. Advantages Cloud computing relies on sharing of resources to achieve coherence and economies of scale similar to a utility (like the electricity grid) over a network.[2] At the foundation of cloud computing is the broader concept of converged infrastructure and shared services. The cloud also focuses on maximizing the effectiveness of the shared resources. Cloud resources are usually not only shared by multiple users but are also dynamically re-allocated per demand. This can work for allocating resources to users. For example, a cloud computer facility, which serves European users during European business hours with a specific application (e.g. email) while the same resources are getting reallocated and serve North American users during North America's business hours with another application (e.g. web server). This approach should maximize the use of computing powers thus reducing environmental damage as well since less power, air conditioning, rackspace, etc. is required for a variety of functions. The term 'moving to cloud' also refers to an organization moving away from a traditional CAPEX model (buy the dedicated hardware and depreciate it over a period of time) to theOPEX model (use a shared cloud infrastructure and pay as you use it). Proponents claim that cloud computing allows companies to avoid upfront infrastructure costs, and focus on projects that differentiate their businesses instead of infrastructure.[3]Proponents also claim that cloud computing allows enterprises to get their applications up and running faster, with improved manageability and less maintenance, and enables IT to more rapidly adjust resources to meet fluctuating and unpredictable business demand.[3][4][5] Hosted services In marketing, cloud computing is mostly used to sell hosted services in the sense of application service provisioning that run client server software at a remote location. Such services are given popular acronyms like 'SaaS' (Software as a Service), 'PaaS' (Platform as a Service), 'IaaS' (Infrastructure as a Service), 'HaaS' (Hardware as a Service) and finally 'EaaS' (Everything as a Service). End users access cloud-based applications through a web browser, thin client or mobile app while the business software and user's data are stored on servers at a remote location. History The 1950s The underlying concept of cloud computing dates back to the 1950s, when large-scale mainframe computers became available in academia and corporations, accessible via thin clients/terminal computers, often referred to as 'dumb terminals', because they were used for communications but had no internal processing capacities. To make more efficient use of costly mainframes, a practice evolved that allowed multiple users to share both the physical access to the computer from multiple terminals as well as to share the CPU time. This eliminated periods of inactivity on the mainframe and allowed for a greater return on the investment. The practice of sharing CPU time on a mainframe became known in the industry as time-sharing.[6] The 1960s–1990s John McCarthy opined in the 1960s that 'computation may someday be organized as a public utility.'[7] Almost all the modern-day characteristics of cloud computing (elastic provision, provided as a utility, online, illusion of infinite supply), the comparison to the electricity industry and the use of public, private, government, and community forms, were thoroughly explored in Douglas Parkhill's 1966 book, The Challenge of the Computer Utility. Other scholars have shown that cloud computing's roots go all the way back to the 1950s when scientist Herb Grosch (the author of Grosch's law) postulated that the entire world would operate on dumb terminals powered by about 15 large data centers.[8] Due to the expense of these powerful computers, many corporations and other entities could avail themselves of computing capability through time sharing and several organizations, such as GE's GEISCO, IBM subsidiary The Service Bureau Corporation (SBC, founded in 1957), Tymshare (founded in 1966), National CSS (founded in 1967 and bought by Dun & Bradstreet in 1979), Dial Data (bought by Tymshare in 1968), and Bolt, Beranek and Newman (BBN) marketed time sharing as a commercial venture. The 1990s In the 1990s, telecommunications companies,who previously offered ";
var texts = [text, text2];
var currentText = Math.floor((Math.random() * texts.length));
console.log('Using text: ' + currentText);

// loadCloud(null, $('#cloud'), null, fonts[currentFont], texts[currentText]);
var testText = window.jsinterface.getCloudString();
loadCloud(null, $('#cloud'), null, fonts[currentFont], testText);
