import VolumeBtn from './volume-btn/volume-btn';
import HealthBar from './health-bar/health-bar';

export default class Header {
  static init() {
    VolumeBtn.init();
    HealthBar.init();
  }
}
