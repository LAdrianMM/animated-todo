import React, { useCallback, useState } from 'react'
import { VStack, useColorModeValue, Fab, Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons'
import TaskList from '../components/task-list'
import shortid from 'shortid'
import AnimatedColorBox from '../components/animated-color-box'
import Masthead from '../components/masthead'
import NavBar from '../components/navbar'

const initialData = [
  {
    id: shortid.generate(),
    subject: 'Buy movie tickets for Friday',
    done: false
  },
  {
    id: shortid.generate(),
    subject: 'Make a React Native tutorial',
    done: false
  }
]

export default function MainScreen() {
  const [data, setData] = useState(initialData)
  const [editingItemId, setEditingItemId] = useState<string | null>(null)

  const handleToggleTaskItem = useCallback(item => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        done: !item.done
      }
      return newData
    })
  }, [])

  const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
    setData(prevData => {
      const newData = [...prevData]
      const index = prevData.indexOf(item)
      newData[index] = {
        ...item,
        subject: newSubject
      }
      return newData
    })
  }, [])

  const handleFinishEditingTaskItem = useCallback(item => {
    if (item.subject.length === 0) {
      setData(prevData => {
        const newData = prevData.filter(i => i !== item)
        return newData
      })
    }
    setEditingItemId(null)
  }, [])

  const handlePressTaskItemLabel = useCallback(item => {
    setEditingItemId(item.id)
  }, [])

  const handleRemoveItem = useCallback(item => {
    setData(prevData => {
      const newData = prevData.filter(i => i !== item)
      return newData
    })
  }, [])

  return (
    <AnimatedColorBox
      flex={1}
      w="full"
      bg={useColorModeValue('warmGray.50', 'primary.900')}
    >
      <Masthead title="What's up" image={require('../assets/masthead.png')}>
        <NavBar />
      </Masthead>
      <VStack
        space={1}
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        borderTopRightRadius="20px"
        borderTopLeftRadius="20px"
        pt="20px"
        flex={1}
      >
        <TaskList
          data={data}
          editingItemId={editingItemId}
          onChangeSubject={handleChangeTaskItemSubject}
          onFinishEditing={handleFinishEditingTaskItem}
          onPressLabel={handlePressTaskItemLabel}
          onRemoveItem={handleRemoveItem}
          onToggleItem={handleToggleTaskItem}
        />
      </VStack>
      <Fab
        position="absolute"
        renderInPortal={false}
        size="sm"
        icon={<Icon size="sm" color="white" as={<AntDesign name="plus" />} />}
        colorScheme={useColorModeValue('blue', 'darkBlue')}
        bg={useColorModeValue('blue.600', 'blue.400')}
        onPress={() => {
          const id = shortid.generate()
          setData([
            {
              id,
              subject: '',
              done: false
            },
            ...data
          ])
          setEditingItemId(id)
        }}
      />
    </AnimatedColorBox>
  )
}
