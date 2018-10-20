import { Component, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ColorState, ColorStateModel } from 'src/app/color.state';

@Component({
  selector: 'app-composition',
  templateUrl: './composition.component.html',
  styleUrls: ['./composition.component.scss']
})
export class CompositionComponent implements AfterViewInit {
  @ViewChild('container') container: ElementRef;

  @Select(ColorState) color$: Observable<ColorStateModel>;
  video: HTMLVideoElement;
  camera: any;
  scene: any;
  renderer: any;
  material: any;
  texture: any;
  color: any;
  mesh: any;

  constructor(private _router: Router, private _store: Store) {
    this.color = new THREE.Color(0xFFFFFF);
    this.color$.subscribe((s: ColorStateModel) => {
      var colorValue = parseInt(s.hex.replace("#", "0x"), 16);
      if (this.mesh) {
        this.mesh.material.uniforms.color1.value =  new THREE.Color(colorValue);
      }
    });
  }

  ngAfterViewInit() {
    this.init();
    this.animate();
  }

  init() {
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
    this.camera.target = new THREE.Vector3(0, 0, 0);
    this.camera.position.z = 200;

    this.scene = new THREE.Scene();

    this.video = document.createElement('video');
    this.video.crossOrigin = 'anonymous';
    this.video.width = 512;
    this.video.height = 512;
    this.video.loop = true;
    this.video.muted = true;
    this.video.src = 'assets/videos/cells.webm';
    this.video.setAttribute('playsinline', 'playsinline');
    this.video.setAttribute('autoplay', 'autoplay');
    this.video.play();

    this.texture = new THREE.VideoTexture(this.video);
    this.texture.minFilter = THREE.LinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.format = THREE.RGBFormat;

    this.scene.add(new THREE.AmbientLight(0xff4444));
    const light = new THREE.DirectionalLight(0xffffff);
    light.position.set(0.5, 1, 1).normalize();
    this.scene.add(light);

    this.mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader: document.getElementById('vertex-shader').textContent,
        fragmentShader: document.getElementById('fragment-shader').textContent,
        depthWrite: false,
        depthTest: false,
        transparent: false,
        side: THREE.DoubleSide,
        uniforms: {
          texture: { type: 't', value: this.texture },
          color1: { type: "c", value: new THREE.Color(0xFFFFFF) }
        }
      })
    );
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(0xFFFFFF, 1);
    this.container.nativeElement.appendChild(this.renderer.domElement);

    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.update();
  }

  update() {
    this.camera.lookAt(this.camera.target);
    this.renderer.render(this.scene, this.camera);
  }
}
