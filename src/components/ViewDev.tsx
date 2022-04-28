import {
  Table,
  Thead,
  Th,
  Tr,
  Td,
  Tbody,
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
import * as T from 'static/types'

interface Props {
  isOpen: boolean
  onClose: (_?: any) => void
  dev: T.Dev
}
export function ViewDev (props: Props) {

  
  const sortSkills = (a, b) => {
      const aRank = Number(props.dev.skills[a])
      const bRank = Number(props.dev.skills[b])
      if (isNaN(aRank)) return 1
      if (isNaN(bRank)) return -1
      if (aRank < bRank) return 1 
      if (bRank < aRank) return -1
      return 0 
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.dev.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Table>
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
                Object.keys(props.dev.skills).sort(sortSkills).map((k, i) => (
                  <Tr key={i}>
                    <Td>{k}</Td>
                    <Td>{props.dev.skills[k]}</Td>
                  </Tr>
                ))
              }
              <h3>Other Skills</h3>
              <p>{props.dev.otherSkills}</p>
            </Tbody>
          </Table>
        </ModalBody>

        <ModalFooter>
          <Button color='white' bg='#FF5510' mr={3} onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}