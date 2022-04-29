import {
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
  Box
} from "@chakra-ui/react"

const devSkillsMap = {}
const getDevSkills = (dev): string => {
  if (devSkillsMap[dev.name]) return devSkillsMap[dev.name]
  const groupedSkills  = Object.keys(dev.skills)
    .map((key: string): string[] => {
      return [key, dev.skills[key]] 
    })
    .reduce((obj, tuple: string[]) => {
      const skill = tuple[0]
      const rating = tuple[1]
      if (!skill || !rating) return obj
      const existing = obj[rating]
      return {
        ...obj,
        [rating]: existing ? [...existing, skill] : [skill]
      }
    }, {})

  const res = Object.keys(groupedSkills).reverse()
    .map(rating => {
        return `${rating}: ${groupedSkills[rating].join(`, `)}`
    }, []).join(` | `)

  devSkillsMap[dev.name] = res

  return res
}

interface Props {
  devs: any[]
  onClick: any
}
export function DevTable (props: Props) {
  return (
    <Box overflowY="auto" maxHeight="70vh" boxShadow='base'>
      <Table>
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Skills</Th>
          </Tr>
        </Thead>
        <Tbody>
          {
            props.devs.map(x => (
              <Tr className="clickable" onClick={_ => props.onClick(x)}>
                <Td>{x.name}</Td>
                <Td title={getDevSkills(x)}><span className="inline-skills">{getDevSkills(x)}</span></Td>
              </Tr>
            ))
          }
        </Tbody>
      </Table>
    </Box>
  )
}