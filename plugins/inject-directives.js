import Vue from 'vue'
import customDirectives from '~/directives/client'
import _ from 'lodash'

_.each(customDirectives, directive => directive(Vue))
