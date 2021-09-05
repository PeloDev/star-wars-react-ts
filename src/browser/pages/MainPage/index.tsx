import React, { LegacyRef, useContext, useEffect, useRef, useState } from 'react';
import {
    Box,
    Center,
    CircularProgress,
    Flex,
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Link,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    VStack
} from '@chakra-ui/react';
import { MdSearch } from 'react-icons/md';
import { GiLightSabers } from 'react-icons/gi';
import swLogo from '../../assets/vectors/star-wars.svg';
import SWScrollingText from '../../components/SWScrollingText';
import { starWarsScrollBG } from '../../styles';
import Header from '../../components/Header';
import { fetchCharacterImgByIdx } from 'src/browser/helpers';
import tempImg from '../../assets/images/characters/r2d2.png';
import { AppContext, localStorageKey } from '../../core/app-context';
import { ICharacter } from 'src/browser/interfaces';
import { fetchPeople, searchPerson } from 'src/browser/core/api';
import Paginator from 'src/browser/components/Paginator';

interface IProps {
    page?: number;
}

export default function MainPage() {

    const [appState, dispatch] = useContext(AppContext);
    const [pageKey, setPageKey] = useState(Math.floor(Date.now() / 1000));
    const [isLoading, setIsLoading] = useState(false);

    const [showScrollingText, setShowScrollingText] = useState(false);

    // const [page, setPage] = useState(1);
    const [characters, setCharacters] = useState<ICharacter[]>([]);
    const [searchName, setSearchName] = useState<string>("");
    const [total, setTotal] = useState<number | null>(null);
    const topRef = useRef<HTMLDivElement>(null);

    async function getPeople(pg: number, resetPeople = false) {
        if (appState.mainPage.pageNum === pg && !resetPeople)
            return;
        let p = pg < 1 ? appState.mainPage.pageNum : pg;
        setIsLoading(true);
        await fetchPeople(p)
            .then(result => {
                setTotal(result.total);
                setCharacters(result.people as ICharacter[]);
                if (p) {
                    dispatch({
                        type: "mainPageNavigate",
                        value: p
                    });
                }
            })
            .catch((e) => console.log(e))
            .finally(() => {
                setIsLoading(false);
                setSearchName("");
            });
    }

    function searchPeople() {
        setIsLoading(true);
        searchPerson(searchName)
            .then(result => {
                setCharacters(result as ICharacter[]);
            })
            .catch((e) => console.log(e))
            .finally(() => {
                setIsLoading(false);
                // setPageKey(Math.floor(Date.now() / 1000))
            });
    }

    useEffect(() => {
        if (searchName.length > 0) {
            searchPeople();
        } else
            getPeople(0, true);
    }, [searchName]);
    useEffect(() => {
        // console.log(appState);
        if (typeof window !== 'undefined') {
            window.history.replaceState(window.history.state, "Star Wars Character Search", `/${appState.mainPage.pageNum}`);
            // window.scrollTo({
            //     top: 0,
            //     behavior: "smooth"
            // });
        }
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
        // setPageKey(Math.floor(Date.now() / 1000))
    }, [characters]);

    useEffect(() => {
        console.log("Page reload detected");
    }, [])

    function handleSearch(e: React.FormEvent<HTMLInputElement>) {
        let name: string = e.currentTarget.value;
        setSearchName(name);
    }

    return (
        <Box
            // key={pageKey}
            {...starWarsScrollBG}
        >
            {
                showScrollingText
                    ? <SWScrollingText
                        onAnimationEnd={() => {
                            setShowScrollingText(false);
                            dispatch({
                                type: "dontShowIntro"
                            });
                        }}
                    />
                    : <Box
                        h="100vh"
                        overflowY="auto"
                    >
                        <Box ref={topRef} />
                        <Header />
                        <Box
                            p={6}
                        >
                            <Flex
                                flexWrap="wrap-reverse"
                            >
                                <Image
                                    w={240}
                                    h={240}
                                    fit="contain"
                                    src={tempImg}
                                    pos="relative"
                                    animation="driftInSpace infinite 8s linear"
                                />
                                <VStack
                                    flex={1}
                                    justifyContent="center"
                                    minW="280px"
                                    mr={[0, "10%", "15%"]}
                                    my={4}
                                >
                                    <Flex
                                        justifyContent="center"
                                        w="100%"
                                    >
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<MdSearch color="grey" />}
                                            />
                                            <Input
                                                _focus={{ borderColor: "swYellow" }}
                                                color="#ffc909"
                                                type="text"
                                                placeholder="Search"
                                                value={searchName}
                                                onChange={handleSearch}
                                            />
                                            {
                                                isLoading &&
                                                <InputRightElement
                                                    pointerEvents="none"
                                                    children={
                                                        <Box
                                                            mr={8}
                                                        >
                                                            <CircularProgress
                                                                isIndeterminate
                                                                size={30}
                                                                trackColor="transparent"
                                                                color="#ffc909"
                                                            />
                                                        </Box>
                                                    }
                                                />
                                            }

                                        </InputGroup>
                                    </Flex>
                                </VStack>
                            </Flex>
                            <Box
                                px={[0, "10%", "20%"]}
                            >
                                <Table>
                                    <Thead>
                                        <Tr>
                                            {
                                                // characters.length > 0 &&
                                                // Object.keys(characters[0])
                                                //     .map((charKey, charKeyIdx) => (
                                                //         <Th
                                                //             key={`char-table-${charKeyIdx + 1}`}
                                                //             textTransform="capitalize"
                                                //         >
                                                //             {charKey}
                                                //         </Th>
                                                //     ))
                                            }
                                            <Th>
                                                Name
                                            </Th>
                                            <Th>
                                                <Flex
                                                    justifyContent="end"
                                                >
                                                    View
                                                </Flex>
                                            </Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {
                                            characters.map((char, charIdx) => {
                                                return (
                                                    <Tr
                                                        key={`character-row-${char.name.replace(" ", "-").toLowerCase()}`}
                                                        color="whiteAlpha.800"
                                                        cursor="pointer"
                                                        _hover={{
                                                            color: "#ffc909",
                                                            fontSize: 18,
                                                            fontWeight: 700
                                                        }}
                                                    >
                                                        {
                                                            // Object.keys(char).map((charKey: keyof ICharacter, charKeyIdx) => {

                                                            //     return (
                                                            //         <Td
                                                            //             key={`character-data-${charKey}-${char.name.replace(" ", "-").toLowerCase()}`}
                                                            //             textTransform="capitalize"
                                                            //             color="yellow.400"
                                                            //         >
                                                            //             {char[charKey]}
                                                            //         </Td>
                                                            //     );
                                                            // })
                                                        }
                                                        <Td
                                                            textTransform="capitalize"
                                                        >
                                                            <Link
                                                                href={`/character/${char.id}`}
                                                            >
                                                                {char.name}
                                                            </Link>
                                                        </Td>
                                                        <Td>
                                                            <Link
                                                                href={`/character/${char.id}`}
                                                            >
                                                                <Flex
                                                                    justifyContent="end"
                                                                >
                                                                    <GiLightSabers />
                                                                </Flex>
                                                            </Link>
                                                        </Td>
                                                    </Tr>
                                                );
                                            })
                                        }
                                    </Tbody>
                                </Table>
                            </Box>
                            <Paginator
                                count={characters.length}
                                total={total ?? 0}
                                pageNumber={appState.mainPage.pageNum}
                                isLoading={isLoading}
                                onNavigate={async (pg) => {
                                    await getPeople(pg);
                                }}
                            />
                        </Box>
                    </Box>
            }

        </Box>
    );
}
