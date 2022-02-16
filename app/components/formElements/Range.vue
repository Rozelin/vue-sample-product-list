<template>
  <vue-slider
    :value="value"
    :order="false"
    :contained="true"
    :min="+min"
    :max="+max"
    :lazy="true"
    :railStyle="{background: '#e4e4e4'}"
    :dotStyle="{borderColor: '#cc5476'}"
    :processStyle="{background: '#cc5476'}"
    :tooltipStyle="{background: '#9896a4'}"
    data-label="label"
    tooltip="active"
    @change="$emit('change', $event)"
  />
</template>
<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/antd.css'

export default {
  name: 'Range',
  components: {
    VueSlider,
  },
  props: {
    min: {
      type: Number,
      required: true,
      default: 0,
    },
    max: {
      type: Number,
      required: true,
      default: 0,
    },
    step: {
      type: Number,
      required: true,
      default: 0,
    },
    value: {
      type: Array,
      required: false,
      default: () => [0,0],
    }
  },
}
</script>
