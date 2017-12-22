import React from "react";
import classNames from 'class-names';
import {
  compose,
  withState,
  withHandlers,
  lifecycle,
} from 'recompose';
import {
  TweenMax,
  TweenLite,
  Power3,
} from 'gsap';
import SvgGray from './assets/svgGray';
import SvgBlue from './assets/svgBlue';
import SvgCoding from './assets/svgCoding';
import SvgTravelling from './assets/svgTravelling';
import SvgHololens from './assets/svgHololens';

import './styles.css';


// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //


const TYPE_BLUE = 'blue';
const TYPE_CODING = 'coding';
const TYPE_TRAVELLING = 'travelling';
const TYPE_HOLOLENS = 'hololens';

const TYPES = [TYPE_BLUE, TYPE_CODING, TYPE_TRAVELLING, TYPE_HOLOLENS];

const Hero = ({
  handleAvatarBlue,
  handleAvatarCoding,
  active,
}) => (
  <div className="hero-wrapper">
    <div className="svg-wrapper">
      <SvgGray className="svg-holder" viewBox="0 0 270 270" />
    </div>
    <SvgBlue id={TYPE_BLUE} className="hidden" viewBox="0 0 270 270" />
    <SvgCoding id={TYPE_CODING} className="hidden" viewBox="0 0 270 270" />
    <SvgTravelling id={TYPE_TRAVELLING} className="hidden" viewBox="0 0 270 270" />
    <SvgHololens id={TYPE_HOLOLENS} className="hidden" viewBox="0 0 270 270" />
  </div>
);


// ---------------------------------------------------------------------------------- //
// COMPOSE
// ---------------------------------------------------------------------------------- //

const getCoordinates = (polygon) => {
  return polygon.getAttribute("points").match(/(-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)\ (-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)\ (-?[0-9][0-9\.]*),(-?[0-9][0-9\.]*)/);
};

const createPolygonPointsObject = (polygons) => {
  const polygonsArray = [];

  polygons.forEach((polygon, i) => {
    const coordinates = getCoordinates(polygon);

    polygonsArray.push({
      fill: polygon.getAttribute("fill"),
      one: coordinates[1],
      two: coordinates[2],
      three: coordinates[3],
      four: coordinates[4],
      five: coordinates[5],
      six: coordinates[6]
    });
  });

  return polygonsArray;
}

const animatePolygons = (toPolygonArray) => {
  const polygons = document.querySelector(".svg-holder").querySelectorAll("polygon");
  const fromPolygonArray = createPolygonPointsObject(polygons);

  fromPolygonArray.forEach((obj, i) => {
    TweenMax.to(obj, 3, {
      one: toPolygonArray[i].one,
      two: toPolygonArray[i].two,
      three: toPolygonArray[i].three,
      four: toPolygonArray[i].four,
      five: toPolygonArray[i].five,
      six: toPolygonArray[i].six,
      ease: Power3.easeOut,
      onUpdate: () => {
        polygons[i].setAttribute("points", `${obj.one},${obj.two} ${obj.three},${obj.four} ${obj.five},${obj.six}`);
      }
    });
  });

  // animate color
  polygons.forEach((polygon, i) => {
    const toColor = toPolygonArray[i].fill;

    TweenLite.to(polygon, 6, {
      fill: toColor,
      ease: Power3.easeOut
    });
  });
}

const updatePolygonArrays = (idToAnimateTo) => {
  const toPolygonArray = createPolygonPointsObject(document.getElementById(idToAnimateTo).querySelectorAll("polygon"));
  animatePolygons(toPolygonArray);
};

const activateSvg = ({ active, setActive }) => {
  let nextIndex = active !== null ? active + 1 : 0;
  if (nextIndex > (TYPES.length - 1)) {
    nextIndex = 0;
  }
  const nextType = TYPES[nextIndex];
  updatePolygonArrays(nextType);
  setActive(nextIndex);
};

const withLifecycle = lifecycle({
  componentDidMount() {
    setTimeout(() => {
      activateSvg(this.props);

      setInterval(() => {
        activateSvg(this.props);
      }, 10000)  ;
    }, 500);
  },
});

export default compose(
  withState('active', 'setActive', null),
  withLifecycle,
)(Hero);