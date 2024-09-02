import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

export default function Home(){
    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 mt-10 gap-10">
                <div className="">
                    <p className="text-6xl font-light"><span className="font-bold text-primary italic">Driverfy</span> – twoje narzędzie do analizy danych z tachografu.</p>
                    <p className="text-xl font-medium opacity-50 mt-5">Załaduj pliki DDD i szybko sprawdź przepracowane dni, godziny pracy oraz szczegóły aktywności. Zarządzaj swoim czasem bez komplikacji!</p>
                    <button className="btn mt-5 btn-lg btn-primary rounded-full">Załóż konto</button>
                </div>
                <div>
                    <p className="text-xl font-bold mb-4">Mozliwosci driverfy</p>

                    <p className="text-2xl font-bold">Jakub Nowak</p>
                    <div className="stats shadow mt-5">
                        <div className="stats stats-horizontal shadow">

                            <div className="stat">
                                <div className="stat-title">Km</div>
                                <div className="stat-value text-xl">1230</div>
                            </div>

                            <div className="stat">
                                <div className="stat-title">Średnia</div>
                                <div className="stat-value text-xl">500</div>
                            </div>

                            {/*<div className="stat">*/}
                            {/*    <div className="stat-title">Premia</div>*/}
                            {/*    <div className="stat-value text-xl">{activities[activeMonth].additionalInformation.bonus}</div>*/}
                            {/*</div>*/}

                            <div className="stat">
                                <div className="stat-title">Dni robocze</div>
                                <div className="stat-value text-xl">24</div>
                            </div>

                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
                        <div className="relative p-10 rounded-2xl shadow text-center bg-success/50">
                            <div className="top-3 right-3 absolute">
                                <div className="flex gap-2 items-center">
                                    <span className="text-primary font-bold">8+</span>
                                </div>
                            </div>
                            <div>
                                <div className="absolute top-3 left-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-success"
                                         viewBox="0 0 512 512">
                                        <path
                                            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
                                    </svg>
                                </div>
                            </div>
                            <p className="mb-1">1 maja</p><p className="font-semibold">644 km</p><p className="italic">
                            <span>PL, D</span></p>
                        </div>
                        <div className="relative p-10 rounded-2xl shadow text-center bg-success/50">
                            <div className="top-3 right-3 absolute">
                                <div className="flex gap-2 items-center"><span
                                    className="text-primary font-bold">8+</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-primary"
                                         viewBox="0 0 384 512">
                                        <path
                                            d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <div className="absolute top-3 left-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-success"
                                         viewBox="0 0 512 512">
                                        <path
                                            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
                                    </svg>
                                </div>
                            </div>
                            <p className="mb-1">2 maja</p>
                            <p className="font-semibold">702 km</p>
                            <p className="italic"><span>D,F</span></p>
                        </div>
                        <div className="relative p-10 rounded-2xl shadow text-center bg-success/50">
                            <div className="top-3 right-3 absolute">
                                <div className="flex gap-2 items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-primary"
                                         viewBox="0 0 384 512">
                                        <path
                                            d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"></path>
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <div className="absolute top-3 left-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-success"
                                         viewBox="0 0 512 512">
                                        <path
                                            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
                                    </svg>
                                </div>
                            </div>
                            <p className="mb-1">3 maja</p><p className="font-semibold">608 km</p><p className="italic">
                            <span>E</span></p>
                        </div>
                        <div className="relative p-10 rounded-2xl shadow text-center bg-success/50">
                            <div className="top-3 right-3 absolute">
                                <div className="flex gap-2 items-center">
                                </div>
                            </div>
                            <div>
                                <div className="absolute top-3 left-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-success"
                                         viewBox="0 0 512 512">
                                        <path
                                            d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path>
                                    </svg>
                                </div>
                            </div>
                            <p className="mb-1">4 maja</p><p className="font-semibold">586 km</p><p className="italic">
                            <span>E, F</span></p>
                        </div>
                    </div>
                    {/*<Swiper*/}
                    {/*    modules={[Pagination, Autoplay]}*/}
                    {/*    className="mySwiper"*/}
                    {/*    pagination={{*/}
                    {/*        clickable: true,*/}
                    {/*    }}*/}
                    {/*    autoplay={{*/}
                    {/*        delay: 3000*/}
                    {/*    }}*/}
                    {/*    loop={true}*/}
                    {/*>*/}
                    {/*    <SwiperSlide>*/}
                    {/*        <div className="pb-10">*/}
                    {/*            */}
                    {/*        </div>*/}
                    {/*    </SwiperSlide>*/}
                    {/*    <SwiperSlide>*/}
                    {/*        <div>*/}
                    {/*            <div className="bg-base-100 shadow rounded-2xl p-5 mt-5">*/}
                    {/*                <div className="overflow-x-auto">*/}
                    {/*                    <table className="table">*/}
                    {/*                        <thead>*/}
                    {/*                        <tr>*/}
                    {/*                            <th></th>*/}
                    {/*                            <th>Kierowca</th>*/}
                    {/*                            <th>Dni robocze</th>*/}
                    {/*                            <th>Km</th>*/}
                    {/*                            <th>Ocena</th>*/}
                    {/*                            <th>Premia</th>*/}
                    {/*                        </tr>*/}
                    {/*                        </thead>*/}
                    {/*                        <tbody>*/}
                    {/*                        <tr>*/}
                    {/*                            <td>1</td>*/}
                    {/*                            <td>*/}
                    {/*                                <div className="flex items-center gap-3">*/}
                    {/*                                    <div className="avatar">*/}
                    {/*                                        <div className="mask mask-squircle w-12 h-12"><img*/}
                    {/*                                            src="https://static.vecteezy.com/system/resources/previews/026/175/074/original/driver-avatar-round-flat-icon-vector.jpg"*/}
                    {/*                                            alt="Avatar Tailwind CSS Component" /></div>*/}
                    {/*                                    </div>*/}
                    {/*                                    <div>*/}
                    {/*                                        <div className="font-bold">Kovalchak Andrii</div>*/}
                    {/*                                    </div>*/}
                    {/*                                </div>*/}
                    {/*                            </td>*/}
                    {/*                            <td><span className="font-bold">27</span></td>*/}
                    {/*                            <td><span className="font-bold">15781</span></td>*/}
                    {/*                            <td><span className="font-bold">77%</span></td>*/}
                    {/*                            <td><span className="font-bold">482</span></td>*/}
                    {/*                        </tr>*/}
                    {/*                        <tr>*/}
                    {/*                            <td>2</td>*/}
                    {/*                            <td>*/}
                    {/*                                <div className="flex items-center gap-3">*/}
                    {/*                                    <div className="avatar">*/}
                    {/*                                        <div className="mask mask-squircle w-12 h-12"><img*/}
                    {/*                                            src="https://static.vecteezy.com/system/resources/previews/026/175/074/original/driver-avatar-round-flat-icon-vector.jpg"*/}
                    {/*                                            alt="Avatar Tailwind CSS Component" /></div>*/}
                    {/*                                    </div>*/}
                    {/*                                    <div>*/}
                    {/*                                        <div className="font-bold">Pylat Ihor</div>*/}
                    {/*                                    </div>*/}
                    {/*                                </div>*/}
                    {/*                            </td>*/}
                    {/*                            <td><span className="font-bold">16.5</span></td>*/}
                    {/*                            <td><span className="font-bold">15744</span></td>*/}
                    {/*                            <td><span className="font-bold">67%</span></td>*/}
                    {/*                            <td><span className="font-bold">150</span></td>*/}
                    {/*                        </tr>*/}
                    {/*                        <tr>*/}
                    {/*                            <td>3</td>*/}
                    {/*                            <td>*/}
                    {/*                                <div className="flex items-center gap-3">*/}
                    {/*                                    <div className="avatar">*/}
                    {/*                                        <div className="mask mask-squircle w-12 h-12"><img*/}
                    {/*                                            src="https://static.vecteezy.com/system/resources/previews/026/175/074/original/driver-avatar-round-flat-icon-vector.jpg"*/}
                    {/*                                            alt="Avatar Tailwind CSS Component" /></div>*/}
                    {/*                                    </div>*/}
                    {/*                                    <div>*/}
                    {/*                                        <div className="font-bold">Deresh Oleksandr</div>*/}
                    {/*                                    </div>*/}
                    {/*                                </div>*/}
                    {/*                            </td>*/}
                    {/*                            <td><span className="font-bold">16.5</span></td>*/}
                    {/*                            <td><span className="font-bold">15744</span></td>*/}
                    {/*                            <td><span className="font-bold">67%</span></td>*/}
                    {/*                            <td><span className="font-bold">275</span></td>*/}
                    {/*                        </tr>*/}
                    {/*                        <tr>*/}
                    {/*                            <td>4</td>*/}
                    {/*                            <td>*/}
                    {/*                                <div className="flex items-center gap-3">*/}
                    {/*                                    <div className="avatar">*/}
                    {/*                                        <div className="mask mask-squircle w-12 h-12"><img*/}
                    {/*                                            src="https://static.vecteezy.com/system/resources/previews/026/175/074/original/driver-avatar-round-flat-icon-vector.jpg"*/}
                    {/*                                            alt="Avatar Tailwind CSS Component" /></div>*/}
                    {/*                                    </div>*/}
                    {/*                                    <div>*/}
                    {/*                                        <div className="font-bold">Ivanov Serhii</div>*/}
                    {/*                                    </div>*/}
                    {/*                                </div>*/}
                    {/*                            </td>*/}
                    {/*                            <td><span className="font-bold">19.5</span></td>*/}
                    {/*                            <td><span className="font-bold">15713</span></td>*/}
                    {/*                            <td><span className="font-bold">56%</span></td>*/}
                    {/*                            <td><span className="font-bold">200</span></td>*/}
                    {/*                        </tr>*/}
                    {/*                        <tr>*/}
                    {/*                            <td>5</td>*/}
                    {/*                            <td>*/}
                    {/*                                <div className="flex items-center gap-3">*/}
                    {/*                                    <div className="avatar">*/}
                    {/*                                        <div className="mask mask-squircle w-12 h-12"><img*/}
                    {/*                                            src="https://static.vecteezy.com/system/resources/previews/026/175/074/original/driver-avatar-round-flat-icon-vector.jpg"*/}
                    {/*                                            alt="Avatar Tailwind CSS Component" /></div>*/}
                    {/*                                    </div>*/}
                    {/*                                    <div>*/}
                    {/*                                        <div className="font-bold">Ivanova Tetiana</div>*/}
                    {/*                                    </div>*/}
                    {/*                                </div>*/}
                    {/*                            </td>*/}
                    {/*                            <td><span className="font-bold">19.5</span></td>*/}
                    {/*                            <td><span className="font-bold">15713</span></td>*/}
                    {/*                            <td><span className="font-bold">56%</span></td>*/}
                    {/*                            <td><span className="font-bold">325</span></td>*/}
                    {/*                        </tr>*/}
                    {/*                        </tbody>*/}
                    {/*                        <tfoot></tfoot>*/}
                    {/*                    </table>*/}
                    {/*                </div>*/}
                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </SwiperSlide>*/}
                    {/*    <SwiperSlide>Slide 3</SwiperSlide>*/}
                    {/*    <SwiperSlide>Slide 4</SwiperSlide>*/}
                    {/*    <SwiperSlide>Slide 5</SwiperSlide>*/}
                    {/*    <SwiperSlide>Slide 6</SwiperSlide>*/}
                    {/*    <SwiperSlide>Slide 7</SwiperSlide>*/}
                    {/*    <SwiperSlide>Slide 8</SwiperSlide>*/}
                    {/*    <SwiperSlide>Slide 9</SwiperSlide>*/}
                    {/*</Swiper>*/}
                </div>
            </div>
        </>
    );
}