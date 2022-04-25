import {
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
} from "@chakra-ui/react"

const devSkillsMap = {}
const getDevSkills = (dev): string => {
  if (devSkillsMap[dev.name]) return devSkillsMap[dev.name]
  const res = Object.keys(dev.skills).map((key: string): string[] => {
    return [key, dev.skills[key]] 
  }).sort((a: string[], b: string[]): number => {
    const aRank = Number(a[1])
    const bRank = Number(b[1])
    if (isNaN(aRank)) return 1
    if (isNaN(bRank)) return -1
    if (aRank < bRank) return 1 
    if (bRank < aRank) return -1
    return 0 
  }).map((tuple: string[]) => {
    return `${tuple[0]}: ${tuple[1]}`
  }).join(`, `)

  devSkillsMap[dev.name] = res
  return res
}

interface Props {
  devs: any[]
  onClick: any
}
export function DevTable (props: Props) {
  return (
    <Table colorScheme='teal'>
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
  )
}