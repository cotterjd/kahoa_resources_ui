import * as React from "react"
import { border, extendTheme, ThemeConfig } from "@chakra-ui/react"
import { mode } from '@chakra-ui/theme-tools';
import {
  ChakraProvider,
  Box,
  VStack,
  HStack,
  Input,
  Grid,
  Select,
  Button,
  Divider,
} from "@chakra-ui/react"
import { DevTable, Login, ViewDev } from './components'
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { getData, getSkills, getFormattedData } from './utils/getResources'
import './App.css'

const blankFilter = { skill: ``, qualifier: `At or Above`, level: 0 }
export const App: React.FC<any> = (): JSX.Element => {
  const [data, setData] = React.useState([])
  const [devs, setDevs] = React.useState([])
  const [skills, setSkills] = React.useState([`Node`, `CSharp`, `Java`])
  const [dev, setDev] = React.useState({ name: ``, skills: {}, otherSkills: `` })
  const [searchText, setSearchText] = React.useState(``)
  const [isDevModalOpen, setIsDevModalOpen] = React.useState(false)
  const [filters, setFilters] = React.useState([blankFilter])

  React.useEffect(() => {
    const filteredDevs = data
      .filter(x => {
        if (filters.length === 0) return true
        return filters.reduce((bool, filter) => {
          if (!bool) return bool
          if (!filter.skill) return true
          if (!filter.level) return true
          return filter.qualifier === `At or Above`
            ? Number(x.skills[filter.skill]) >= filter.level
            : Number(x.skills[filter.skill]) <= filter.level
        }, true)
      })
      .filter(d => d.name.toLowerCase().includes(searchText?.toLowerCase()))
    setDevs(filteredDevs)
  }, [data, filters, searchText])

  React.useEffect(() => {
      getData()
        .then(res => {
            setSkills(getSkills(res[0]))
            return res
        })
        .then(getFormattedData)
        .then(setData)
  }, [])

  const onChangeSkill = (evt, index) => {
    setFilters(filters.map((x, i) => {
      if (i === index) return { ...x, skill: evt.target.value }
      return x
    }))
  }
  const onChangeLevel = (evt, index) => {
    setFilters(filters.map((x, i) => {
      if (i === index) return { ...x, level: evt.target.value }
      return x
    }))
  }
  const onChangeQualifier = (evt, index) => {
    setFilters(filters.map((x, i) => {
      if (i === index) return { ...x, qualifier: evt.target.value }
      return x
    }))
  }
  const onRemoveFilter = (index: number) => {
    return setFilters([...filters.slice(0, index), ...filters.slice(index+1)])
  }
  
  const onClickRow = (item) => {
    setDev(item)
    setIsDevModalOpen(true)
  }

  const onSearch = (evt) => {
    setSearchText(evt.target.value)
  }

  const config : ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  }

  const styles = {
    global: props => ({
      body: {
        bg: mode('white', '#141414')(props),
    },
      components: {
        Modal: {
          baseStyle: {
            bg: mode('white', '#141414')(props),
          },
        }
      },
    }),
  };

  const theme = extendTheme({ config, styles })

  return <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="md">
      <Grid p={3}>
        <HStack justify='flex-end'>
          <Login />
          <ColorModeSwitcher justifySelf="flex-end" />
        </HStack>
        <VStack spacing={8}>
        {
          filters.map((x, i) => (
            <HStack align="center" spacing='3'>
              <Select placeholder="Select a Skill" onChange={evt => onChangeSkill(evt, i)}>
                {
                  skills.map(x => <option>{x}</option>)
                }
              </Select>
              <Select onChange={evt => onChangeQualifier(evt, i)}>
                <option>At or Above</option>
                <option>At or Below</option>
              </Select>
              <Select placeholder="Select a Level"  onChange={evt => onChangeLevel(evt, i)}>
                <option>10</option>
                <option>9</option>
                <option>8</option>
                <option>7</option>
                <option>6</option>
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
              </Select>
              <Select onChange={evt => onChangeQualifier(evt, i)}>
                <option>View Active</option>
                <option>View Archive</option>
                <option>View All</option>
              </Select>
              &nbsp;
              <Button
                color='#FF5510' 
                className="clickable"
                variant="outline"                
                borderRadius='100px'
                onClick={_ => onRemoveFilter(i)}
              >
                &#x2715;
              </Button>
            </HStack>
          ))
        }
        <HStack spacing='3'>
          <Input width='380px' bg='gray.100' variant='filled' _placeholder={{ opacity: 1, color: 'gray.500' }}  _hover={{ bg: "white", border:"2px solid #FF5510" }}
          _focus={{ boxShadow: "outline", border:"2px solid #FF5510" }} type="text" placeholder="Search developer name" onChange={onSearch} />
          <Divider orientation="vertical" borderColor='gray.500'/>
          <Button color='white' bg='#FF5510' border="2px solid #FF5510" _hover={{background: "white", color: "#FF5510", border: "2px solid #FF5510"}} variant="solid"
            onClick={_ => setFilters([...filters, blankFilter])}
          >+ Add Filter</Button>
          <Button color='white' bg='#FF5510' border="2px solid #FF5510" _hover={{background: "white", color: "#FF5510", border: "2px solid #FF5510"}} variant="solid"
            onClick={_ => {
              setFilters([blankFilter])
            }}
          >Clear Filters</Button>
        </HStack>        
        <span>{devs.length} Results</span>
        <DevTable
          devs={devs}
          onClick={row => onClickRow(row)}
        />
        </VStack>
      </Grid>
    </Box>
    <ViewDev
      isOpen={isDevModalOpen}
      onClose={_ => setIsDevModalOpen(false)}
      dev={dev}
    />
  </ChakraProvider>
}
