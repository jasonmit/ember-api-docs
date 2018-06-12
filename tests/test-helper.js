import { start } from 'ember-cli-qunit';
import Application from '../app';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';

registerPowerSelectHelpers();
setApplication(Application.create(config.APP));
start();
