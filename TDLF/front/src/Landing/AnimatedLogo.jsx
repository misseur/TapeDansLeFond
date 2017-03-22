import { Component, PropTypes } from 'react';
import { StaggeredMotion, Motion, spring } from 'react-motion';
import { IconButton } from 'material-ui';
import { map } from 'ramda';
import { withStyles } from 'vitaminjs';
import s from './style.css';
import Logo from './Logo-empty';

class AnimatedLogo extends Component {
    state = {
        displayText: false,
    }

    getStyles(prevStyles) {
        // `prevStyles` is the interpolated value of the last tick
        const endValue = prevStyles.map((_, i) => {
            return i === 0
                ? { left: spring(10), opacity: spring(1) }
                : {
                    left: spring(prevStyles[i - 1].left + 10),
                    opacity: spring(prevStyles[i - 1].opacity),
                    // y: spring(prevStyles[i - 1].y),
                };
        });
        return endValue;
    }

    render() {
        return (
            <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="#FFF">
                <g>
                    <path className={s.title} d="M54.914,25.937c3.224-1.98,5.397-5.697,5.397-9.959c0-6.34-4.382-11.055-10.312-11.055   c-5.928,0-10.309,4.714-10.309,11.055c0,4.263,2.173,7.979,5.398,9.96c-1.781,0.671-4.058,1.668-6.049,2.994   c-0.761,5.452-1.664,10.8-0.379,16.087c3.127,2.888,3.153,6.016,2.507,9.292c0,0-0.028,0.311-0.013,0.312l3.456,16.792   c-0.856,0-2.139,0-2.995,0c-0.701,0.002-1.275,0.575-1.275,1.276c0,3.959,0,7.92,0,11.879c0,0.7,0.571,1.366,1.27,1.465   c5.567,0.763,11.214,0.763,16.78,0c0.699-0.099,1.27-0.765,1.27-1.465c0-3.959,0-7.92,0-11.879c0-0.701-0.574-1.274-1.275-1.276   c-0.855,0-2.138,0-2.993,0l3.454-16.792c0.017-0.002-0.013-0.312-0.013-0.312c-0.646-3.276-0.62-6.404,2.508-9.292   c1.284-5.288,0.382-10.635-0.379-16.087C58.971,27.605,56.694,26.607,54.914,25.937z"/>
                    <path className={s.title} style={{ /*animationDirection: 'reverse'*/ }} d="M0,29.624v0.5v10.48v0.5v0.5h34.154c-0.278-4.001,0.845-12.48,0.845-12.48H0V29.624z"/>
                    <path className={s.title} d="M65.062,29.124c0,0,1.122,8.478,0.844,12.48H100v-0.5v-0.5v-10.48v-0.5v-0.5H65.062z"/>
                </g>
            </svg>
        );
        return (
            <Logo
                color="#B2FF59"
                hoverColor="#FFFFFF"
                style={{ height: 100, width: 100 }}
                css={s.title}
            />
            );
        const title = 'ape dans le fond';
        return (
            <StaggeredMotion
                defaultStyles={map(() => ({ left: 0, opacity: 0 }), title.split(''))}
                styles={this.getStyles}
            >
                {interpolatingStyles =>
                    <div style={{ position: 'relative', color: 'white' }}>
                        <IconButton
                            style={{
                                padding: 0,
                                width: '100px',
                                height: '100px',
                            }}
                            iconStyle={{
                                width: '100px',
                                height: '100px',
                            }}
                            onMouseOver={() => console.log('to')}
                        >
                            <Logo
                                color="#B2FF59"
                                hoverColor="#FFFFFF"
                            />
                        </IconButton>
                        {interpolatingStyles.map(({ left, opacity }, i) =>
                            <div
                                key={i}
                                style={{
                                    position: 'absolute',
                                    left,
                                    opacity,
                                }}
                            >
                                {title[i]}
                            </div>,
                        )}
                    </div>
                }
            </StaggeredMotion>
            // <Motion>
            //     <IconButton
            //         style={{
            //             padding: 0,
            //             width: '100px',
            //             height: '100px',
            //         }}
            //         iconStyle={{
            //             width: '100px',
            //             height: '100px',
            //         }}
            //         onMouseOver={() => console.log('to')}
            //     >
            //         <Logo
            //             color='#B2FF59'
            //             hoverColor='#FFFFFF'
            //         />
            //     </IconButton>
            // </Motion>
        );
    }
}

export default AnimatedLogo;
