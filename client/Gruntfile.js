module.exports = function (grunt) {

    grunt.initConfig({
        destName: 'app',
        concat: {
            options: {
                separator: '\n\n',
                banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */'
            },
            dist: {
                src: ["js/*.js", "js/**/*.js"],
                dest: 'dist/<%= destName %>.js'
            }
        },
        ngmin: {
            app: {
                src: 'dist/<%= destName %>.js',
                dest: 'dist/<%= destName %>.annotate.js'
            }
        },
        uglify: {
            options: {
                preserveComments: 'some' // Licences
            },
            dist: {
                files: {
                    'dist/<%= destName %>.min.js': ['dist/<%= destName %>.annotate.js']
                }
            }
        },
        jshint: {
            files: '<%= concat.dist.src %>',
            options: {
                // options here to override JSHint defaults
                asi: true,
                globals: {
                    jQuery: true,
                    document: true
                }
            }
        },
        watch: {
            app: {
                files: '<%= concat.dist.src %>',
                tasks: ['jshint', 'concat', 'ngmin', 'uglify']
            },
            less: {
                files: 'css/**.less',
                tasks: ['less:main']
            }
        },
        less: {
            main: {
                files: {
                    "css/main.css": "css/**.less"
                }
            }
        },
        appendSrcTags: {
            app: {
                files: '<%= concat.dist.src %>',
                dest: 'app.write.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-ngmin');

    grunt.registerTask('lint', ['jshint']);

    grunt.registerTask('minify', ['concat', 'ngmin', 'uglify']);

    grunt.registerTask('default', ['jshint', 'concat', 'ngmin', 'uglify']);

    grunt.registerMultiTask('appendSrcTags', 'outputs a js file that `document.write` your files', function () {
        var _ = grunt.util._;

        this.files.forEach(function (f) {
            var files = _.uniq(_.flatten(f.files.map(function (f) {
                return grunt.file.expand(f);
            })));

            var src = "";
            files.forEach(function (filepath) {
                src += 'document.write("<scr"+"ipt src=\'' + filepath + '\'><"+"/scr"+"ipt>");\n';
            });

            grunt.file.write(f.dest, src);
        });

    });

};
