import React, { useEffect, useState } from "react";
import axios from 'axios';
import cheerio from 'cheerio';
import "../Css/News.css";

function News() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = 'http://localhost:9000/news';
                const response = await axios.get(apiUrl);
                let $ = cheerio.load(response.data);

                const newsData = $(".story-box").map((i, element) => {
                    const title = $(element).find("h4").text(); // Use html() instead of text()
                    const description = $(element).find("p").text();
                    const a = $(element).find("a").attr("href"); // Use href instead of url
                    const imgsrc = $(element).find("img").attr("src");
                    return { title, a, description, imgsrc };
                }).get();

                setNews(newsData);

            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
        <div className="newsbody" data-aos="fade-up">
            <ul>
                {news.map((item, index) => (
                    <div className="newsdiv" key={index}>
                        <li className="li">
                            <div className="imageclass">
                                <img src={item.imgsrc} alt={item.title} />
                            </div>
                            <div className="content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </li>
                    </div>
                ))}
            </ul>
        </div>
        </>
    );
}

export default News;
