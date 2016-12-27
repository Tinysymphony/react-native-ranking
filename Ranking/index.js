import React, {
  Component,
  PropTypes
} from 'react';
import {
  ART,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import {default as styles} from './RankingStyle';
import {COLOR, MODE, SIZE} from './RankingConstants';

const {ACTIVE_COLOR, DEFAULT_COLOR, FONT_COLOR} = COLOR;
const {BOARD, SMILES, ARCS, STARS} = MODE;
const {SMALL, MIDDLE, LARGE} = SIZE;

const {
  Shape,
  Group,
  Surface
} = ART;

class Ranking extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.noop = this.noop.bind(this);
  }
  noop() {
    return true;
  }
  drawStar(options) {
    const {
      color = '#fa952f',
      scale = 1
    } = options || {};
    return (
      <Surface width={40 * scale} height={40 * scale}>
        <Group x={20 * scale} y={20 * scale}>
          <Shape
              d={`M 0.000 10.000
                  L 11.756 16.180
                  L 9.511 3.090
                  L 19.021 -6.180
                  L 5.878 -8.090
                  L 0.000 -20.000
                  L -5.878 -8.090
                  L -19.021 -6.180
                  L -9.511 3.090
                  L -11.756 16.180
                  L 0.000 10.000`}
              fill={color}
              scale={scale}
            />
        </Group>
      </Surface>
    );
  }
  parseNumber(num) {
    let arr = [];
    while (num > 0) {
      arr.unshift(num % 1000);
      num = ~~(num / 1000);
    }
    return arr.join();
  }
  renderArcs() {
  }
  renderStars() {
    const {
      score,
      scoreBase,
      size,
      activeColor,
      defaultColor
    } = this.props;
    let arr = [];
    let base = scoreBase;
    let scale = 1;
    while (base--) { arr.push(1); }
    if (size === MIDDLE) scale = 2;
    else if (size === LARGE) scale = 3;
    let activeStar = this.drawStar({scale: 0.3 * scale, color: activeColor});
    let defaultStar = this.drawStar({scale: 0.3 * scale, color: defaultColor});
    return (
      <View style={styles.stars}>
        {arr.map((item, index) =>
          score >= index + 1 ? activeStar : defaultStar
        )}
      </View>
    );
  }
  renderSmiles() {
  }
  renderBoard() {
    const {
      score,
      num,
      activeColor,
      defaultColor,
      fontColor
    } = this.props;
    const BASE = 5;
    let activeStar = this.drawStar({scale: 0.3, color: activeColor});
    let defaultStar = this.drawStar({scale: 0.3, color: defaultColor});
    let arr = [1, 1, 1, 1, 1];
    return (
      <View style={styles.board}>
        <View style={styles.boardScoreWp}>
          <Text style={[styles.boardScore, {color: activeColor}]}>{(score % BASE).toFixed(1)}</Text>
        </View>
        <Text style={[styles.boardNum, {color: fontColor}]}>{num < 1000000 ? this.parseNumber(num) : '100w+'}</Text>
        <View style={styles.boardStars}>
          {arr.map((item, index) =>
            score >= index + 1 ? activeStar : defaultStar
          )}
        </View>
      </View>
    );
  }
  render() {
    const {
      mode
    } = this.props;
    let rankingView;
    if (mode === BOARD) {
      rankingView = this.renderBoard();
    } else if (mode === ARCS) {
      rankingView = this.renderArcs();
    } else if (mode === STARS){
      rankingView = this.renderStars();
    } else {
      rankingView = this.renderSmiles();
    }
    return (
      <TouchableHighlight>
        {rankingView}
      </TouchableHighlight>
    );
  }
}

Ranking.defaultProps = {
  mode: 'board',
  enable: false,
  size: 'md',
  num: 0,
  score: 0,
  scoreBase: 5,
  onScore: () => {},
  name: '',
  activeColor: ACTIVE_COLOR,
  defaultColor: DEFAULT_COLOR,
  fontColor: FONT_COLOR
};

Ranking.propTypes = {
  mode: PropTypes.oneOf([BOARD, ARCS, SMILES, STARS]),
  enable: PropTypes.bool,
  size: PropTypes.oneOf([SMALL, MIDDLE, LARGE]),
  score: PropTypes.number,
  scoreBase: PropTypes.number,
  onScore: PropTypes.func,
  num: PropTypes.number,
  name: PropTypes.string,
  activeColor: PropTypes.string,
  defaultColor: PropTypes.string,
  fontColor: PropTypes.string
};

export default Ranking;