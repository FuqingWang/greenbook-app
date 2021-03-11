import React, { useState, useEffect, useRef } from 'react';
import { useStateValue } from "../components/State";
import { StyleSheet, View, FlatList, Text, Image, ImageBackground, ActivityIndicator, TouchableOpacity, Button } from 'react-native';
import { Link as NextLink } from "../components/Link";
import { PageTitle } from "../components/PageTitle";
import { ResponsiveImage } from "../components/ResponsiveImage";
import { RichText } from "../components/RichText";
import { getStyles, getData, Theme, getContent } from '../utils';
import { getInstagram } from '../utils/getData';
import { handleRootClick } from '../utils/rootClickHandler';
import { FontAwesome } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import * as Scroll from 'react-scroll';
import { Link, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

function Page(props) {

    const [{ view, isWeb, dimensions }, dispatch] = useStateValue();

    const styles = StyleSheet.create(getStyles('button_green, button_white, button_white_text, button_link_text, button_green_text, text_header, text_header2, text_header3, text_header4, text_body, text_quote, section, content, footer', { isWeb }));

    const whySponsor = useRef();
    const sponsorBenefit = useRef();
    const sponsorLevel = useRef();
    const ourSponsors = useRef();

    const handleScroll = (index) => {
        if (index === 0) {
            whySponsor.current.scrollIntoView({ behavior: 'smooth' })
        }
        if (index === 1) {
            sponsorBenefit.current.scrollIntoView({ behavior: 'smooth' })
        }

        if (index === 2) {
            sponsorLevel.current.scrollIntoView({ behavior: 'smooth' })
        }

        if (index === 3) {
            ourSponsors.current.scrollIntoView({ behavior: 'smooth' })
        }

    }

    const [loadingPress, setLoadingPress] = useState(!props.press);
    const [errorPress, setErrorPress] = useState('');
    const [press, setPress] = useState(props.press || []);

    const [loadingUpdates, setLoadingUpdates] = useState(!props.updates);
    const [errorUpdates, setErrorUpdates] = useState('');
    const [updates, setUpdates] = useState(props.updates || []);

    const [loadingInstagram, setLoadingInstagram] = useState(true);
    const [instagram, setInstagram] = useState([]);

    const [loadingListings, setLoadingListings] = useState(!props.listings);
    const [errorListings, setErrorListings] = useState('');
    const [Listings, setListings] = useState(props.listings || []);



    const headerLinks = [
        { href: 'why_sponsor', title: 'Why Sponsor?' },
        { href: 'sponsor_benefits', title: 'Sponsorship Benefits' },
        { href: 'sponsor_levels', title: 'Sponsorship Levels' },
        { href: 'our_sponsors', title: 'Our Sponsors' },
        { href: 'become_sponsor', title: 'BECOME A SPONSOR' }
    ]

    const sponsorLevels = [
        { title: 'Seed', amount: '500' },
        { title: 'Earth', amount: '1K' },
        { title: 'Water', amount: '2K' },
        { title: 'Light', amount: '3K' },
        { title: 'Sprout', amount: '4K' },
        { title: 'Ramekin', amount: '5K' },
        { title: 'Rolling Pin', amount: '10K' },
        { title: 'Spatula', amount: '15K' },
        { title: 'Martini Glass', amount: '20K' },
        { title: 'Ladle', amount: '25K+' },
    ]

    return (
        <React.Fragment>
            <TouchableOpacity activeOpacity={1} style={{ cursor: 'default' }} onPress={e => handleRootClick(e)}>
                <View>
                    <View style={isWeb ? {
                        height: 200,
                        flexDirection: 'row', backgroundColor: Theme.green_bg, alignItems: 'center',
                        justifyContent: 'space-around', paddingTop: 70, position: 'fixed', top: 0, left: 0, right: 0, zIndex: 10
                    } : { backgroundColor: Theme.green_bg, paddingTop: 30, justifyContent: 'center', paddingBottom: 20 }}>
                        {
                            isWeb ? headerLinks.map((header, index) => (
                                <View key={index}>
                                    <View style={dimensions.width < 800 ? { marginTop: 40, marginLeft: 20 } : header.title !== 'BECOME A SPONSOR' ? { marginTop: 40 } : { backgroundColor: 'black', padding: 10, marginTop: 40 }} >
                                        <Text onClick={() => handleScroll(index)} style={dimensions.width < 800 && header.title === 'BECOME A SPONSOR' ? { fontSize: 16, lineHeight: 16, fontFamily: "ApercuMedium", backgroundColor: 'black', padding: 10, color: 'white', fontWeight: 'bold', marginRight: 15, flex: 2, marginTop: 10 } : { fontFamily: "ApercuMedium", fontSize: 18, lineHeight: 16, color: 'white', fontWeight: 'bold' }}>{header.title}</Text>
                                    </View>
                                </View>
                            ))
                                :
                                headerLinks.map((header, index) => (
                                    <View key={index}>
                                        <View style={dimensions.width < 800 && header.title === 'BECOME A SPONSOR' ? { marginTop: 30, backgroundColor: 'black', padding: 10, width: 210, alignItems: 'center', marginHorizontal: 90 } : { marginTop: 40, alignItems: 'center' }} >
                                            <Text style={dimensions.width < 800 && header.title === 'BECOME A SPONSOR' ? { fontSize: 16, lineHeight: 16, fontFamily: "ApercuMedium", padding: 10, color: 'white', fontWeight: 'bold' } : { fontFamily: "ApercuMedium", fontSize: 18, lineHeight: 18, color: 'white', fontWeight: 'bold' }}>{header.title}</Text>
                                        </View>
                                    </View>
                                ))
                        }
                    </View>

                    {/* <Element name="why_sponsor"> */}
                    <View ref={whySponsor} style={isWeb ? [styles.section, { fontSize: 24, paddingTop: 40, marginTop: 200 }] : [styles.section, { fontSize: 24, paddingTop: 40 }]}>
                        <View style={styles.content}>
                            <View style={dimensions.width < 700 ? {} : { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingRight: 50 }}>
                                <View style={{ flex: 1 }}>
                                    <View style={dimensions.width < 700 ? {} : { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <View style={dimensions.width < 700 ? { paddingTop: 40, alignItems: 'center' } : { flex: 2, paddingLeft: 20 }}>
                                            <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { marginBottom: 20 }]}>WHY SPONSOR?</Text>
                                            <Text style={[styles.text_body, { color: '#000' }]}>
                                                Spicy Green Book’s stories are rich in cultural identity—taking you on a fascinating, delicious journey. We can’t tell these stories without your help! Now is your chance to join our exciting movement by supporting our growth. Together, we can empower more Black-owned businesses, diversify the world’s business landscape, and bring amazing food, culture, and experiences to all!
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* </Element> */}

                    <View style={[styles.section, { paddingTop: 10, paddingBottom: 20 }]}>
                        <View style={styles.content}>
                            <View style={dimensions.width < 700 ? { backgroundColor: Theme.green_bg, padding: 10, paddingBottom: 40 } : { backgroundColor: Theme.green_bg, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={dimensions.width < 700 ? {} : { flex: 2, paddingRight: 40 }}>
                                    <ResponsiveImage
                                        style={{ width: 800, resizeMode: 'contain', aspectRatio: 1.1 }}
                                        alt="Opportunity Gap"
                                        source={isWeb ? { uri: '/images/opportunity_gap.jpg' } : require('../public/images/opportunity_gap.jpg')}
                                    />
                                </View>
                                <View style={dimensions.width < 700 ? { paddingTop: 40 } : { flex: 2, paddingRight: 20 }}>

                                    <Text style={dimensions.width < 700 ? [styles.text_body, { color: 'white', fontWeight: 'bold', fontSize: 20, lineHeight: 24 }] : [styles.text_body, { color: 'white', fontWeight: 'bold', fontSize: 22, lineHeight: 35 }]}>
                                        Due to systemic racism and societal injustices, Black-owned businesses often have insufficient access to funding, marketing support, and other services.
                                </Text>
                                    <Text style={dimensions.width < 700 ? [styles.text_body, { color: 'white', paddingTop: 10, fontWeight: 'bold', fontSize: 20, lineHeight: 24 }] : [styles.text_body, { color: 'white', paddingTop: 10, fontWeight: 'bold', fontSize: 22, lineHeight: 35 }]}>
                                        Did you know that 87% of C-Level decision-makers in this nation are white men, while white men make up only 20% of the overall population?
                                </Text>
                                    <Text style={dimensions.width < 700 ? [styles.text_body, { color: 'white', paddingTop: 10, fontWeight: 'bold', fontSize: 20, lineHeight: 24 }] : [styles.text_body, { color: 'white', paddingTop: 10, fontWeight: 'bold', fontSize: 22, lineHeight: 35 }]}>
                                        This statistic alone shines a bright light on what we are trying to change. Your conscientious contribution goes toward helping us level these disparities.
                                </Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <View style={styles.content}>
                            <View style={dimensions.width < 700 ? { alignItems: 'center', marginTop: 40 } : { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', alignItems: 'center' }}>
                                <View style={dimensions.width < 700 ? {} : { flex: 2 }}>
                                    <ResponsiveImage
                                        style={{ width: 100, resizeMode: 'contain', aspectRatio: 1 }}
                                        alt="danilo"
                                        source={isWeb ? { uri: '/images/danilo.png' } : require('../public/images/danilo.png')}
                                    />
                                </View>
                                <View style={dimensions.width < 700 ? { paddingTop: 40 } : { flex: 14, paddingLeft: 20 }}>
                                    <Text style={[styles.text_body, { fontWeight: 'bold' }]}>“A lot of time, effort, and collaboration went into building the systemic problems that have arisen in our history and are still present today. We need an equivalent amount of effort to alter that system for the better.” —Danilo Batson, Founder of SGB.</Text>
                                </View>
                            </View>

                        </View>
                    </View>

                    {/* <Element name="sponsor_benefits"> */}
                    <View ref={sponsorBenefit} style={[styles.section, { paddingTop: 20, paddingBottom: 20 }]}>
                        <View style={styles.content}>
                            <View style={{ alignSelf: 'flex-start' }}>
                                <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, dimensions.width < 700 ? { marginBottom: 20, marginLeft: 50 } : { marginBottom: 20 }]}>SPONSORSHIP BENEFITS</Text>
                            </View>
                            <View style={dimensions.width < 700 ? {} : { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>

                                <View style={dimensions.width < 700 ? { backgroundColor: Theme.green_bg, paddingLeft: 30, paddingRight: 30, paddingBottom: 30 } : { flex: 1, alignSelf: 'stretch', backgroundColor: Theme.green_bg, paddingLeft: 60, paddingRight: 60, paddingTop: 20, paddingBottom: 20 }}>
                                    <Text style={{ fontSize: 24, paddingTop: 20, paddingBottom: 20, color: '#ffffff', marginTop: 40 }}>
                                        Broaden your visibility:
                                </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 15 }}>
                                        <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10 }} />
                                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1, lineHeight: 35 }}>
                                            Reach 193+ participating businesses, thousands of customers, and 800+ volunteers
                                </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 15 }}>
                                        <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10 }} />
                                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1, lineHeight: 35 }}>
                                            Appear on the SGB website and app
                                </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 15 }}>
                                        <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10 }} />
                                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1, lineHeight: 35 }}>
                                            Engage with SGB's Instagram, Facebook, and Twitter communities
                                </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 15 }}>
                                        <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10 }} />
                                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1, lineHeight: 35 }}>
                                            Meet like-minded sponsors, donors, and partners
                                </Text>
                                    </View>
                                </View>

                                <View style={dimensions.width < 700 ? { paddingTop: 40 } : { flex: 1 }}>
                                    <ResponsiveImage
                                        style={{ width: 700, resizeMode: 'contain', aspectRatio: 1.2 }}
                                        alt="Mayas Cookies"
                                        source={isWeb ? { uri: '/images/mayascookies.png' } : require('../public/images/mayascookies.png')}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* </Element> */}

                    <View style={[styles.section, { paddingTop: 20, paddingBottom: 20 }]}>
                        <View style={styles.content}>
                            <View style={dimensions.width < 700 ? {} : { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>

                                <View style={dimensions.width < 700 ? { paddingTop: 40 } : { flex: 1 }}>
                                    <ResponsiveImage
                                        style={{ width: 700, resizeMode: 'contain', aspectRatio: 1.2 }}
                                        alt="plate of crab"
                                        source={isWeb ? { uri: '/images/plateofcrab.png' } : require('../public/images/plateofcrab.png')}
                                    />
                                </View>

                                <View style={dimensions.width < 700 ? { backgroundColor: Theme.green_bg, paddingLeft: 30, paddingRight: 30, paddingBottom: 30, marginTop: 30, marginBottom: 40 } : { flex: 1, alignSelf: 'stretch', backgroundColor: Theme.green_bg, paddingLeft: 60, paddingRight: 60, paddingTop: 20, paddingBottom: 20 }}>
                                    <Text style={{ fontSize: 24, paddingTop: 20, paddingBottom: 20, color: '#ffffff', marginTop: 40 }}>
                                        Build your reputation:
                                </Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 15 }}>
                                        <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10 }} />
                                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                                            Support diversity and eliminating marginalization
                                </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 15 }}>
                                        <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10 }} />
                                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                                            Gain valuable partnerships with SGB and the many Black-owned businesses we support
                                </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 15 }}>
                                        <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10 }} />
                                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                                            Be recognized in your community as a fair, equitable business
                                </Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', paddingBottom: 15 }}>
                                        <FontAwesome name="check" size={25} style={{ color: 'white', marginRight: 10 }} />
                                        <Text style={{ fontSize: 24, alignSelf: 'flex-end', color: '#ffffff', flex: 1 }}>
                                            Work with our dedicated PR team actively booking interviews, television appearances, and connecting with influencers
                                </Text>
                                    </View>
                                </View>


                            </View>
                        </View>
                    </View>


                    {/* <Element name="sponsor_levels"> */}
                    <View ref={sponsorLevel} id="sponsor_levels" style={styles.section}>
                        <View style={styles.content}>
                            <View style={dimensions.width < 700 ? { alignItems: 'center', paddingBottom: 30 } : { alignSelf: 'flex-start', paddingBottom: 30 }}>
                                <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { marginBottom: 20 }]}>SPONSORSHIP LEVELS</Text>
                                <Text style={styles.text_body}>Each Sponsorship contribution level has its own benefits. Tap to learn more or download our <Text style={{ color: '#246e43' }}>Sponsorship Packet.</Text></Text>
                            </View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignContent: 'center', justifyContent: 'space-around' }}>
                                {sponsorLevels && sponsorLevels.map(level => (
                                    <View style={{ paddingBottom: 40 }} key={level.title}>

                                        <View style={dimensions.width < 700 ? [additionalStyles.levels, { display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }] : [additionalStyles.levels, { display: 'flex', justifyContent: 'center', flexDirection: 'row' }]}>
                                            <Text style={dimensions.width < 700 ? [styles.button_white_text, additionalStyles.amount, { lineHeight: 65, marginTop: 60 }] : [styles.button_white_text, additionalStyles.amount]}><FontAwesome name="dollar" size={60} color="white" />{level.amount}</Text>
                                        </View>

                                        <Text style={dimensions.width < 700 ? [styles.text_header4, { alignSelf: 'center', marginTop: 15, fontSize: 30, lineHeight: 30 }] : [styles.text_header4, { alignSelf: 'center', marginTop: 15, fontSize: 30 }]}>{level.title}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    </View>
                    {/* </Element> */}

                    {/* <Element name="our_sponsors"> */}
                    <View ref={ourSponsors} style={styles.section}>
                        <View style={styles.content}>
                            <View style={dimensions.width < 700 ? { alignItems: 'center', paddingBottom: 30 } : { alignSelf: 'flex-start', paddingBottom: 30 }}>
                                <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { marginBottom: 20 }]}>OUR SPONSORS</Text>
                                <Text style={styles.text_body}>Call for Sponsors! Become one of the first to contribute to our cause. To learn more, download our <Text style={{ color: '#246e43' }}>Sponsorship Packet.</Text></Text>
                                <Text style={dimensions.width < 700 ? [styles.text_body, { marginTop: 20 }] : styles.text_body}>To express your interest in sponsorship, please email us: <NextLink href="mailto:d.batson@spicygreenbook.org"><Text style={{ color: '#246e43' }}>d.batson@spicygreenbook.org</Text></NextLink></Text>
                            </View>
                            <View style={dimensions.width < 700 ? { justifyContent: 'center', alignItems: 'center', alignContent: 'center' } : { flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }}>
                                <TouchableOpacity style={[styles.button_green, { backgroundColor: 'white', marginRight: 10, marginBottom: 10 }]}><Text style={{ color: '#246e43', fontSize: 16, lineHeight: 15, fontFamily: "ApercuMedium" }}>DOWNLOAD SPONSORSHIP PACKET</Text></TouchableOpacity>
                                <TouchableOpacity style={dimensions.width < 700 ? [styles.button_green, { marginLeft: 12, marginRight: 20, alignSelf: 'stretch' }] : [styles.button_green, { marginLeft: 10, flexBasis: '30%' }]}><Text style={dimensions.width < 700 ? [styles.button_white_text, { marginLeft: 50 }] : [styles.button_white_text, { paddingLeft: 40 }]}>BECOME A SPONSOR</Text></TouchableOpacity>
                            </View>

                        </View>
                    </View>
                    {/* </Element> */}

                    <View style={styles.section}>
                        <View style={[styles.content, { display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }]}>
                            <View style={dimensions.width < 700 ? { alignItems: 'center', paddingBottom: 30 } : { alignSelf: 'flex-start', paddingBottom: 30 }}>
                                <Text accessibilityRole="header" aria-level="3" style={[styles.text_header3, { marginBottom: 20 }]}>IN KIND SUPPORT</Text>
                                <Text style={styles.text_body}>Want to contribute another way? We will happily accept your in kind support! <NextLink href="mailto:d.batson@spicygreenbook.org"><Text style={{ color: '#246e43' }}>Contact Us</Text></NextLink> to share your product/service.</Text>
                                <Text style={styles.text_body}>Thank you to our following supporters for helping us reduce our operational expenses:</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '100%', flexWrap: 'wrap' }}>
                                <View style={{ flexBasis: '20%' }}>
                                    <ResponsiveImage
                                        style={{ width: 200, resizeMode: 'contain', aspectRatio: .8 }}
                                        alt="verizon"
                                        source={isWeb ? { uri: '/images/verizon.jpg' } : require('../public/images/verizon.jpg')}
                                    />
                                </View>
                                <View style={{ flexBasis: '20%' }}>
                                    <ResponsiveImage
                                        style={{ width: 200, resizeMode: 'contain', aspectRatio: 1 }}
                                        alt="sponsor"
                                        source={isWeb ? { uri: '/images/sponsorIcon.jpg' } : require('../public/images/sponsorIcon.jpg')}
                                    />
                                </View>
                                <View style={{ flexBasis: '20%' }}>
                                    <ResponsiveImage
                                        style={{ width: 200, resizeMode: 'contain', aspectRatio: .5 }}
                                        alt="sponsor"
                                        source={isWeb ? { uri: '/images/konnect.jpg' } : require('../public/images/konnect.jpg')}
                                    />
                                </View>
                            </View>

                        </View>
                    </View>



                </View>
            </TouchableOpacity>


        </React.Fragment >
    )
}

const additionalStyles = StyleSheet.create({
    levels: {
        backgroundColor: 'black',
        borderRadius: 100,
        height: 180,
        width: 180
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 60,
        marginTop: 80
    }
})



export default Page;