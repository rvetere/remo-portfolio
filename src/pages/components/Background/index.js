import React from 'react';
import {
  compose,
  lifecycle,
} from 'recompose';
import SvgBg from './svgBg';

import './styles.css';

const Background = () => (
  <div className="page-background">
    <SvgBg id="bgSvg" viewBox="0 0 750 279" />
  </div>
);

const regex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
let bgDiv = null;
let bgSvg = null;
let sun = null;
let mesaLayers = null;
let SVGoffsettop = null;
let vertHeight = null;

const scrollHandler = () => {
  if (window.scrollY < vertHeight) {
	  Array.prototype.forEach.call(mesaLayers, function(layer) {
		  const layerFill = layer.getAttribute("fill");
		  const vertRoll = Math.abs(window.scrollY - vertHeight) / vertHeight;
		  const hslComponents = layerFill.match(regex).slice(1);
		  const newHSL = parseFloat(hslComponents[2]) * vertRoll;
		  layer.style.fill = "hsl(" + hslComponents[0] +", "+ hslComponents[1] + "%, " +  newHSL + "%)";
		  bgSvg.style.background = "hsl(48, " + 100 * vertRoll + "%, " + 88 * vertRoll + "%)";
		  bgDiv.style.background = "hsl(48, " + 100 * vertRoll + "%, " + 88 * vertRoll + "%)";
		  sun.style.transform = "translate3d(0," + window.scrollY / 7 + "px, 0)";
		});
  } else {
    // bgSvg.style.transform = "translateY(-"+ (window.scrollY - vertHeight)+"px)";
	}
};

const withLifecycle = lifecycle({
  componentDidMount() {
    bgSvg = document.getElementById('bgSvg');
    bgDiv = document.body;
    mesaLayers = bgSvg.querySelectorAll('path'),
    SVGoffsettop = bgSvg.getBoundingClientRect().top,
    vertHeight = bgSvg.getBoundingClientRect().height,
    sun = document.getElementById('sun');

    window.onscroll = () => {
      window.requestAnimationFrame(scrollHandler);
    };
  },
})

export default compose(
  withLifecycle,
)(Background);