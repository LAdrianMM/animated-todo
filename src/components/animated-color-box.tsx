import React, { useEffect } from 'react'
import { Box, useTheme, themeTools } from 'native-base'
import usePrevious from '../utils/use-previous'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated'
import interpolateColorBugFix from '../utils/interpolateColorBugFix'

const AnimatedBox = Animated.createAnimatedComponent(Box)

const AnimatedColorBox = ({ bg, ...props }: any) => {
  const theme = useTheme()
  const hexBg = themeTools.getColor(theme, bg)
  const prevHexBg = usePrevious(hexBg)
  const progress = useSharedValue(0)

  useEffect(() => {
    progress.value = 0
  }, [hexBg])

  const animatedStyles = useAnimatedStyle(() => {
    progress.value = withTiming(1, { duration: 200 })
    return {
      backgroundColor: interpolateColorBugFix(
        progress.value,
        [0, 1],
        [prevHexBg || hexBg, hexBg]
      )
    }
  }, [hexBg])

  return <AnimatedBox {...props} style={animatedStyles} />
}

export default AnimatedColorBox
