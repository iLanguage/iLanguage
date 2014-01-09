angular.module('app')
    .factory('Benchmark', function () {
        function Benchmark(name, data) {
            this.name = name;
            this.instances = data;
            this.activeInstances = [].concat(data);
        }

        angular.extend(Benchmark.prototype, {
            isActive: function (instance) {
                return this.activeInstances.indexOf(instance) !== -1;
            },
            addActive: function (instance) {
                if (!this.isActive(instance)) {
                    this.activeInstances.push(instance);
                }
            },
            removeActive: function (instance) {
                if (this.isActive(instance)) {
                    this.activeInstances.splice(this.activeInstances.indexOf(instance), 1);
                }
            },
            toggleActive: function (instance) {
                if (this.isActive(instance)) {
                    this.removeActive(instance);
                } else {
                    this.addActive(instance);
                }
            },
            addEntry: function (data) {
                this.instances.push(data);
                this.activeInstances.push(data);
            },
            hasEntry: function (data) {
                var answer = false;
                angular.forEach(this.instances, function (instance) {
                    if (instance.startDate === data.startDate && instance.endDate === data.endData) {
                        answer = true;
                    }
                });
                return answer;
            }
        });

        return Benchmark;
    });