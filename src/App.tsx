import * as React from "react"
import {
  ChakraProvider,
  Box,
  VStack,
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Grid,
  Select,
  Flex,
  theme,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
} from "@chakra-ui/react"
import { DevTable } from './components'
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import './App.css'

const blankFilter = { skill: ``, qualifier: `At or Above`, level: 0 }
export const App: React.FC<any> = (): JSX.Element => {
  const [data, setData] = React.useState([])
  const [devs, setDevs] = React.useState([])
  const [skills, setSkills] = React.useState([`Node`, `CSharp`, `Java`])
  const [dev, setDev] = React.useState({ name: ``, skills: {}, otherSkills: `` })
  const [isDevModalOpen, setIsDevModalOpen] = React.useState(false)
  const [filters, setFilters] = React.useState([blankFilter])

  React.useEffect(() => {
    setDevs(data.filter(x => {
        if (filters.length === 0) return true
        return filters.reduce((bool, filter) => {
          if (!bool) return bool
          if (!filter.skill) return true
          if (!filter.level) return true
          return filter.qualifier === `At or Above`
            ? Number(x.skills[filter.skill]) >= filter.level
            : Number(x.skills[filter.skill]) <= filter.level
        }, true)
      }))
  }, [data, filters])

  React.useEffect(() => {
    fetch(`https://kahoa-resource-server-prototype.onrender.com/resources`)
      .then(r => r.json())
      .then(res => {
        const otherKey = "Other Languages I Have Skill In (include your skill rating)"
        const el = res[0]
        const skillsFromFile = Object.keys(el).reduce((acc, key) => {
          if (![`TimeStamp`, `Username`, otherKey].includes(key)) return [...acc, key]
          return acc
        }, [])
        setSkills(skillsFromFile)
        const formattedData = res.map(x => ({
          name: x.Username,
          available: false,
          dateAvailable: ``,
          project: ``,
          skills: {
            "Spring": x.Spring,
            "Hibernate": x.Hibernate,
            "Maven": x.Maven,
            "Flyway": x.Flyway,
            "GraphQL": x.GraphQL,
            "MySQL": x.MySQL,
            "PL/SQL": x["PL/SQL"],
            "Postgres": x.Postgres,
            "jMeter": x.jMeter,
            "Python": x.Python,
            "JavaScript": x.JavaScript,
            "C#": x["C#"],
            "PHP": x.PHP,
            "Angular": x.Angular,
            "React": x.React,
            "Vue": x.Vue.js,
            "MongoDB": x.MongoDB,
            "AWS": x.AWS,
            "Azure": x.Azure,
            "Bash": x.Bash,
            "Linux": x.Linux,
            "CSS": x.CSS,
            "TypeScript": x.TypeScript,
            "JQuery": x.JQuery,
            "Flutter": x.Flutter,
            "Swift": x.Swift,
            "Objective C": x["Objective C"],
            "Android Native": x["Android Native"],
            "Kotlin": x.Kotlin,
            "Go": x.Go,
            "Erlang": x.Erlang,
            "ReactNative": x.ReactNative,
            "DynamoDB": x.DynamoDB,
            "Node": x.Node.js,
            "Java": x.Java,
            "SQL Server": x["SQL Server"],
          },
          otherSkills: x[otherKey],
        }))

      setData(formattedData)
      })
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
  return <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="x
    l">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
        {
          filters.map((x, i) => (
            <Flex align="center">
              <Select placeholder="Select a Skill" onChange={evt => onChangeSkill(evt, i)}>
                {
                  skills.map(x => <option>{x}</option>)
                }
              </Select>
              <Select onChange={evt => onChangeQualifier(evt, i)}>
                <option>At or Above</option>
                <option>At or Below</option>
              </Select>
              <Select placeholder="Select a Level" onChange={evt => onChangeLevel(evt, i)}>
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
              &nbsp;
              <span
                className="clickable"
                style={{ color: "red" }}
                onClick={_ => onRemoveFilter(i)}
              >
                &#x2715;
              </span>
            </Flex>
          ))
        }
        <Flex>
          <Button colorScheme="teal" variant="outline"
            onClick={_ => setFilters([...filters, blankFilter])}
          >+ Add Filter</Button>
          <Button colorScheme="teal" variant="outline"
            onClick={_ => {
              setFilters([blankFilter])
            }}
          >Clear Filters</Button>
        </Flex>
        <span>{devs.length} Results</span>
            <DevTable
              devs={devs}
              onClick={row => onClickRow(row)}
            />
        </VStack>
      </Grid>
    </Box>
    <Modal isOpen={isDevModalOpen} onClose={() => setIsDevModalOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{dev.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table colorScheme='teal'>
            <Thead>
              <Tr>
                <Th>Skill</Th>
                <Th>
                  Rating &nbsp; 
                  <Popover>
  <PopoverTrigger>
    <span className="info clickable">?</span>
  </PopoverTrigger>
  <PopoverContent>
    <PopoverArrow />
    <PopoverCloseButton />
    <PopoverHeader>Ratings are based on the following scale</PopoverHeader>
    <PopoverBody>
      <ol style={{ paddingLeft: `10px` }}>
        <li>No Experience</li>
        <li>Reviewed code in this language once or twice</li>
        <li>Played around in the code before but not professionally</li>
        <li>I've committed code in this language before</li>
        <li>I've helped deliver a project in this language</li>
        <li>I can contribute to any project in this language</li>
        <li>I can develop a project by myself in this language</li>
        <li>I can lead a team in this language</li>
        <li>I can solve complex problems and deliver enterprise quality software in this language </li>
        <li>God(dess)-Like</li> 
      </ol>                                                                               
    </PopoverBody>                                                                        
  </PopoverContent>                                                                       
</Popover>                                                                                
                </Th>                                                                     
              </Tr>                                                                       
            </Thead>                                                                      
            <Tbody>
              {
                Object.keys(dev.skills).map((k, i) => (
                  <Tr key={i}>
                    <Td>{k}</Td>
                    <Td>{dev.skills[k]}</Td>
                  </Tr>
                ))
              }
              <h3>Other Skills</h3>
              <p>{dev.otherSkills}</p>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={_ => setIsDevModalOpen(false)}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </ChakraProvider>
}
