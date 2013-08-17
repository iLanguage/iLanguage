angular.module('app')
    .factory('Benchmark', function () {
        function Benchmark(name, data) {
            this.name = name;
            this.data = data;
            this.activeData = [].concat(data);
        }

        angular.extend(Benchmark.prototype, {
            isActive: function (instance) {
                return this.activeData.indexOf(instance) !== -1;
            },
            addActive: function (instance) {
                if (!this.isActive(instance)) {
                    this.activeData.push(instance);
                }
            },
            removeActive: function (instance) {
                if (this.isActive(instance)) {
                    this.activeData.splice(this.activeData.indexOf(instance), 1);
                }
            },
            toggleActive: function (instance) {
                if (this.isActive(instance)) {
                    this.removeActive(instance);
                } else {
                    this.addActive(instance);
                }
            }
        });

        return Benchmark;
    });