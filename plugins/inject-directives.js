import customDirectives from '~/directives/client'
import Vue from 'vue'
import _ from 'lodash'

_.each(customDirectives, directive => directive(Vue))
