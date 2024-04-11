import { Box, Flex, Heading, UnorderedList, ListItem } from '@chakra-ui/react'

export const Resume = () => {
    return (
        <Flex as="main" w={{ base: '100%', md: '4xl' }} flexDirection="column">
            <Box as="section" pb={12}>
                <Heading pb={2}>Select Solo Exhibitions</Heading>
                <UnorderedList>
                    <ListItem>2018 “Sentient Beings” Liberty Market Lofts, 5 Hanna, Toronto October/November, 2018</ListItem>
                    <ListItem>2017 “The Idea of Summer” Latitude 44 Gallery, Toronto, June</ListItem>
                    <ListItem>2016 “Signs, Signs, Everywhere a Sign” Roastery, 401 Richmond, (March-May) </ListItem>
                    <ListItem>2014 “CANOE” October 16 – Nov. 13, Latitude 44 Gallery, Toronto </ListItem>
                    <ListItem>2007-8 “Out/Of Place” Cambridge Galleries (Preston) Dec. 8 – Jan 20, 2008 </ListItem>
                    <ListItem>2006 HangMan Gallery, Toronto, Ontario (Jan. 17 – Feb. 5, 2006) </ListItem>
                    <ListItem>2005 Homer Watson House Gallery, Kitchener, Ont. March 2005 </ListItem>
                    <ListItem>2004 Praxis Gallery, Toronto, Ontario </ListItem>
                    <ListItem>2001 Loon Studios Gallery, Parry Sound, Ontario </ListItem>
                </UnorderedList>
            </Box>
            <Box as="section" pb={12}>
                <Heading pb={2}>Selected Group Exhibitions, Grants & Awards</Heading>
                <UnorderedList>
                    <ListItem>2007, 08, 15, 17 McMichael Gallery Autumn Art Sale </ListItem>
                    <ListItem>
                        2016 Ontario Society of Artists Open Juried Show <strong>(Japanese Paper Place Award</strong>)
                    </ListItem>
                    <ListItem>2012/19 Ojibway Club Art Show - Pte. Au Baril, Ontario </ListItem>
                    <ListItem>2010 “Wish You were Here” (3 person show) Susan Kristjansson Gallery, Sarnia </ListItem>
                    <ListItem>2013 Art Gallery of Hamilton Spring Show/Sale </ListItem>
                    <ListItem>
                        2009/10/11 Royal Agricultural Winter Fair Fine Art Showcase (<strong>Top Ten 2009</strong>)
                    </ListItem>
                    <ListItem>
                        2006 Latinoamerica International Invitational, Toronto, March 2006 (<strong>Honourable Mention</strong>)
                    </ListItem>
                    <ListItem>2005 International Juried Figure Exhibition, Red Dot Gallery, Santa Fe, NM </ListItem>
                    <ListItem>2005 Anchorage, Alaska Museum of History and Art "Dogs" International Exhibition </ListItem>
                    <ListItem>
                        2005 Riverdale Art Walk, June, 2005 (<strong>Juror's Choice Award</strong>)
                    </ListItem>
                    <ListItem>2004 Printmaking Council of New Jersey National Juried Show </ListItem>
                    <ListItem>
                        2004 Schoharie Co. U.S. National Small Works Exhibition <strong>(Honourable Mention</strong>)
                    </ListItem>
                    <ListItem>
                        2004 Colour Form Society Juried Show (<strong>Merit Award</strong>)
                    </ListItem>
                    <ListItem>2002 Society of Canadian Artists Annual Juried Show John B. Aird Gallery,Toronto, Ontario</ListItem>
                    <ListItem>
                        2001 Michael Gibson Gallery, London, Ontario - Miniatures, Juried Exhibition (<strong>Grand Prize</strong>)
                    </ListItem>
                    <ListItem>2001 Stage Gallery, New York – “Small Works, Top Priority” International Juried Exhibition </ListItem>
                    <ListItem>
                        2000 Neilson Pk Creative Centre, Toronto Annual Juried Exhibition (<strong>Honourable Mention</strong>)
                    </ListItem>
                    <ListItem>1983 Ontario Society of Artists Open Jury Show </ListItem>
                    <ListItem>1981 Mississauga Library Annual Jury Show (Best Print) </ListItem>
                    <ListItem>1981 Ontario Arts Council Grant </ListItem>
                    <ListItem>
                        1980 Mississauga Library Annual Jury Show (<strong>Best Drawing</strong>)
                    </ListItem>
                    <ListItem>
                        1978 Ontario Society of Artists Open Jury Show (<strong>Purchase Award</strong>)
                    </ListItem>
                </UnorderedList>
            </Box>
            <Box as="section" pb={12}>
                <Heading pb={2}>Representation</Heading>
                <UnorderedList>
                    <ListItem>Ethel Curry Gallery, Haliburton</ListItem>
                    <ListItem>Koyman Galleries, Ottawa </ListItem>
                    <ListItem>Latitude 44 Gallery, Toronto</ListItem>
                    <ListItem>Red Canoe Gallery, Pt. Carling </ListItem>
                    <ListItem> St. Germain Gallery, Toronto </ListItem>
                </UnorderedList>
            </Box>
            <Box as="section" pb={12}>
                <Heading pb={2}>Publications</Heading>
                <UnorderedList>
                    <ListItem>2019 Winter, GoodLife Magazine </ListItem>
                    <ListItem>2016 Arabella Magazine </ListItem>
                    <ListItem>2007 Dec.. 8: Cambridge Now: Brigitte Nowak Exhibition … </ListItem>
                    <ListItem>2007 Dec. 12: Echo Weekly </ListItem>
                    <ListItem> 2005 “Vibrant Exhibit Brightens Winter Day”, Spoke, Kitchener </ListItem>
                    <ListItem>2003 "Interview with an artist" MTO Online News</ListItem>
                </UnorderedList>
            </Box>
        </Flex>
    )
}
