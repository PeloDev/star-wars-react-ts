import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Box,
    Flex,
    Image,
} from '@chakra-ui/react';
import SWScrollingText from '../../components/SWScrollingText';
import { starWarsScrollBG } from '../../styles';
import Header from '../../components/Header';
import tempImg from '../../assets/images/characters/r2d2.png';
import { AppContext } from '../../core/app-context';
import { ICharacter } from 'src/browser/interfaces';
import { fetchPeople, searchPerson } from 'src/browser/core/api';
import Paginator from 'src/browser/components/Paginator';
import CharactersTable from 'src/browser/components/CharactersTable';
import SearchBar from 'src/browser/components/SearchBar';

export default function MainPage() {

    const [appState, dispatch] = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(false);
    const [showScrollingText, setShowScrollingText] = useState(false);
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
            });
    }

    useEffect(() => {
        if (searchName.length > 0) {
            searchPeople();
        } else
            getPeople(0, true);
    }, [searchName]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.history.replaceState(window.history.state, "Star Wars Character Search", `/${appState.mainPage.pageNum}`);
        }
        topRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [characters]);

    function handleSearch(e: React.FormEvent<HTMLInputElement>) {
        let name: string = e.currentTarget.value;
        setSearchName(name);
    }

    return (
        <Box
            {...starWarsScrollBG}
        >
            {
                showScrollingText
                    ? <SWScrollingText
                        onAnimationEnd={() => {
                            setShowScrollingText(false);
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
                                <SearchBar 
                                    isLoading={isLoading}
                                    searchName={searchName}
                                    handleSearch={handleSearch}
                                />
                            </Flex>
                            <Box
                                px={[0, "10%", "20%"]}
                            >
                                <CharactersTable 
                                    characters={characters}
                                />
                            </Box>
                            <Paginator
                                count={characters.length}
                                total={total ?? 0}
                                pageNumber={appState.mainPage.pageNum}
                                searchName={searchName}
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
