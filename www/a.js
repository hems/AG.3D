
var __t;

__t = function(ns, expose) {
  var curr, index, part, parts, _i, _len;
  curr = null;
  parts = [].concat = ns.split(".");
  for (index = _i = 0, _len = parts.length; _i < _len; index = ++_i) {
    part = parts[index];
    if (curr === null) {
      curr = eval(part);
      if (expose != null) {
        expose[part] = curr;
      }
      continue;
    } else {
      if (curr[part] == null) {
        curr = curr[part] = {};
        if (expose != null) {
          expose[part] = curr;
        }
      } else {
        curr = curr[part];
      }
    }
  }
  return curr;
};

var app = {};

(function() {
  var delay,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  __t('app').App = (function() {

    App.name = 'App';

    function App() {
      this.build = __bind(this.build, this);

      var onDocumentMouseDown,
        _this = this;
      this.build();
      this.clock = new app.ko.Clock(60);
      this.steps = new app.views.stepx.Steps(this, 16);
      this.clock.power(true);
      $('#bpm').bind('change', function() {
        return _this.clock.bpm($('#bpm').val());
      });
      onDocumentMouseDown = function(event) {
        var ray, vector;
        vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
        _this.projector.unprojectVector(vector, _this.camera);
        ray = new THREE.Ray(_this.camera.position, vector.subSelf(_this.camera.position).normalize());
        return $(_this).trigger('app.click', ray);
      };
      document.addEventListener('mousedown', onDocumentMouseDown, false);
    }

    App.prototype.build = function() {
      this.display_ratio = window.innerWidth / window.innerHeight;
      this.scene = new THREE.Scene();
      this.projector = new THREE.Projector();
      this.renderer = new THREE.CanvasRenderer();
      this.camera = new THREE.PerspectiveCamera(75, this.display_ratio, 1, 10000);
      this.camera.position.z = 1000;
      this.scene.add(this.camera);
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      return document.body.appendChild(this.renderer.domElement);
    };

    App.prototype.render = function() {
      return this.renderer.render(this.scene, this.camera);
    };

    return App;

  })();

  $(function() {
    var ag, animate;
    animate = function() {
      requestAnimationFrame(animate);
      return ag.render();
    };
    window.ag = ag = new app.App;
    return animate();
  });

  delay = function(delay, funktion) {
    return setTimeout(funktion, delay);
  };

  __t('app.ko').Clock = (function() {

    Clock.name = 'Clock';

    Clock.SECOND = 60000;

    Clock.prototype.power = false;

    Clock.prototype.interval_id = 0;

    function Clock(bpm) {
      this.tick = __bind(this.tick, this);

      this.power = __bind(this.power, this);

      this.bpm = __bind(this.bpm, this);
      this.bpm(bpm);
    }

    Clock.prototype.bpm = function(_bpm) {
      if (_bpm != null) {
        this._bpm = _bpm;
        if (this.is_on) {
          this.power(true);
        }
      }
      return _bpm;
    };

    Clock.prototype.power = function(toggle) {
      if (toggle) {
        this.power(false);
        this.interval_id = setInterval(this.tick, app.ko.Clock.SECOND / this._bpm);
      } else {
        if (this.interval_id != null) {
          clearInterval(this.interval_id);
        }
        this.interval_id = null;
      }
      return this.is_on = toggle;
    };

    Clock.prototype.tick = function() {
      return $(this).trigger('clock.tick');
    };

    return Clock;

  })();

  __t('app.views.stepx').Step = (function() {

    Step.name = 'Step';

    function Step(a, index) {
      this.a = a;
      this.index = index;
      this.power = __bind(this.power, this);

      this.x = __bind(this.x, this);

      this.scale = __bind(this.scale, this);

      this.click = __bind(this.click, this);

      $(this.a).bind('app.click', this.click);
      this.geometry = new THREE.CubeGeometry(20, 100, 20);
      this.m_off = new THREE.MeshBasicMaterial({
        color: 0x444444,
        wireframe: false
      });
      this.m_on = new THREE.MeshBasicMaterial({
        color: 0x999999,
        wireframe: false
      });
      this.mesh = new THREE.Mesh(this.geometry, this.m_off);
    }

    Step.prototype.click = function(event, ray) {
      var intersect, intersects, _i, _len, _results;
      intersects = ray.intersectObjects([this.mesh]);
      _results = [];
      for (_i = 0, _len = intersects.length; _i < _len; _i++) {
        intersect = intersects[_i];
        _results.push(this.scale(50));
      }
      return _results;
    };

    Step.prototype.scale = function(value) {
      console.log(this.mesh);
      return this.mesh.scale.y = .5;
    };

    Step.prototype.x = function(xpos) {
      return this.mesh.position.x = xpos;
    };

    Step.prototype.power = function(toggle) {
      if (toggle) {
        return this.mesh.material = this.m_on;
      } else {
        return this.mesh.material = this.m_off;
      }
    };

    return Step;

  })();

  __t('app.views.stepx').Steps = (function() {

    Steps.name = 'Steps';

    Steps.prototype.steps = null;

    Steps.prototype.last = null;

    Steps.prototype.selected = 0;

    function Steps(a, length) {
      var x, _fn, _i, _ref,
        _this = this;
      this.a = a;
      this.length = length;
      this.step = __bind(this.step, this);

      this.steps = [];
      $(this.a.clock).bind('clock.tick', this.step);
      this.length--;
      _fn = function(x) {
        var step;
        step = new app.views.stepx.Step(_this.a, x);
        step.x(x * 30);
        _this.steps.push(step);
        return _this.a.scene.add(step.mesh);
      };
      for (x = _i = 0, _ref = this.length; 0 <= _ref ? _i <= _ref : _i >= _ref; x = 0 <= _ref ? ++_i : --_i) {
        _fn(x);
      }
    }

    Steps.prototype.step = function() {
      var item;
      if (this.last != null) {
        this.last.power(false);
      }
      item = this.steps[this.selected];
      item.power(true);
      this.selected++;
      if (this.selected === this.steps.length) {
        this.selected = 0;
      }
      return this.last = item;
    };

    return Steps;

  })();

}).call(this);
