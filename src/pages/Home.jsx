import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNavScrolled, setMenuOpen, setActiveSection } from '../store/uiSlice';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import {
	Menu, X, Code2, Terminal, MonitorSmartphone, Server, ShieldCheck, Zap,
	Mail, Phone, MapPin, ChevronRight, Github, Linkedin, Twitter,
	User, CheckCircle2, Clock, Cpu,
	ChevronUp
} from 'lucide-react';
import { setField, setStatus, resetForm } from '../store/contactSlice';
import { SiMongodb, SiExpress, SiReact, SiNodedotjs, SiTypescript, SiTailwindcss, SiBootstrap, SiGithub } from 'react-icons/si';

import IMT from '../assets/imt.jpg';
import HRMS from '../assets/hrms.jpg';
import FinTech from '../assets/FinTech.png';
import Health from '../assets/health_and_fitness.png';
import ECommerce from '../assets/e-commerce.png';
import { FaLinkedin, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const Home = () => {
	const dispatch = useDispatch();
	const { navScrolled, menuOpen, activeSection } = useSelector((state) => state.ui);
	const contact = useSelector((state) => state.contact);
	const [showTop, setShowTop] = React.useState(false);

	useEffect(() => {
		const handleScroll = () => {
			dispatch(setNavScrolled(window.scrollY > 50));

			// 👇 Show button after scrolling down
			setShowTop(window.scrollY > 700);

			const sections = ['home', 'services', 'tech-stack', 'portfolio', 'about', 'why-me', 'contact'];
			for (const section of sections) {
				const el = document.getElementById(section);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top <= 150 && rect.bottom >= 150) {
						dispatch(setActiveSection(section));
					}
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [dispatch]);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const scrollTo = (id) => {
		const el = document.getElementById(id);
		if (el) {
			window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
		}
		dispatch(setMenuOpen(false));
	};

	// const handleContactSubmit = (e) => {
	// 	e.preventDefault();
	// 	dispatch(setStatus('pending'));

	// 	setTimeout(() => {
	// 		dispatch(setStatus('success'));
	// 		setTimeout(() => {
	// 			dispatch(resetForm());
	// 		}, 3000);
	// 	}, 1500);
	// };

	const handleContactSubmit = (e) => {
		e.preventDefault();
		dispatch(setStatus('pending'));

		emailjs.send(
			import.meta.env.VITE_EMAILJS_SERVICE_ID,     // from EmailJS
			import.meta.env.VITE_EMAILJS_TEMPLATE_ID,    // from EmailJS
			{
				name: contact.name,
				email: contact.email,
				projectType: contact.projectType,
				message: contact.message,
			},
			import.meta.env.VITE_EMAILJS_PUBLIC_KEY      // from EmailJS
		)
			.then(() => {
				dispatch(setStatus("success"));

				setTimeout(() => {
					dispatch(resetForm());
				}, 3000);
			})
			.catch((error) => {
				console.error(error);
				dispatch(setStatus("error"));
			});
	};

	const navLinks = [
		{ id: 'services', label: 'Services' },
		{ id: 'tech-stack', label: 'Tech Stack' },
		{ id: 'portfolio', label: 'Portfolio' },
		{ id: 'about', label: 'About' },
		{ id: 'why-me', label: 'Why Me' },
		{ id: 'contact', label: 'Contact' },
	];

	return (
		<div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 selection:text-primary">

			{/* Navbar */}
			<nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navScrolled ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
				<div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
					<div className="text-2xl font-bold font-mono tracking-tighter cursor-pointer group flex items-center gap-1" onClick={() => scrollTo('home')}>
						<span className="text-primary">&lt;</span>
						<span className="text-foreground transition-colors group-hover:text-primary">RK</span>
						<span className="text-primary">/&gt;</span>
					</div>

					{/* Desktop Nav */}
					<div className="hidden md:flex items-center gap-8 font-medium">
						{navLinks.map((link) => (
							<button
								key={link.id}
								onClick={() => scrollTo(link.id)}
								className={`text-sm uppercase tracking-wider transition-colors cursor-pointer hover:text-primary relative ${activeSection === link.id ? 'text-primary' : 'text-muted-foreground'}`}
							>
								{link.label}
								{activeSection === link.id && (
									<motion.div layoutId="nav-indicator" className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary rounded-full" />
								)}
							</button>
						))}
						<button
							onClick={() => scrollTo('contact')}
							className="px-6 py-2.5 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-sm uppercase tracking-wider font-semibold shadow-md hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
						>
							Hire Me
						</button>
					</div>

					{/* Mobile Menu Toggle */}
					<button className="md:hidden text-foreground p-2 focus:outline-none" onClick={() => dispatch(setMenuOpen(!menuOpen))} >
						{menuOpen ? <X size={28} /> : <Menu size={28} />}
					</button>
				</div>
			</nav>

			{/* Mobile Nav Dropdown */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl pt-24 pb-12 px-6 flex flex-col items-center md:hidden overflow-y-auto"
					>
						<div className="flex flex-col gap-6 items-center w-full max-w-sm mt-8">
							{navLinks.map((link) => (
								<button
									key={link.id}
									onClick={() => scrollTo(link.id)}
									className={`text-xl font-medium w-full py-4 border-b border-border/30 text-center transition-colors ${activeSection === link.id ? 'text-primary' : 'text-foreground'}`}
								>
									{link.label}
								</button>
							))}
							<button
								onClick={() => scrollTo('contact')}
								className="w-full py-4 mt-6 rounded bg-primary text-primary-foreground font-bold uppercase tracking-wider shadow-lg"
							>
								Hire Me
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<main>
				{/* Hero Section */}
				<section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 min-h-[95vh] flex flex-col justify-center relative overflow-hidden">
					<div className="absolute top-[10%] -right-[10%] w-150 h-150 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
					<div className="absolute -bottom-[10%] -left-[10%] w-125 h-125 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

					<div className="container mx-auto px-6 md:px-12 relative z-10">
						<div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
							<motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-2xl" >
								<div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-8 font-medium">
									<span className="relative flex h-2 w-2">
										<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
										<span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
									</span>
									Available for new projects
								</div>

								<h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
									Building <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">digital excellence</span> from the ground up.
								</h1>

								<p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl font-light">
									Hi, I'm <span className="text-foreground font-semibold">Rahul Kar</span>. A senior MERN stack developer architecting high-performance websites and mobile apps for forward-thinking businesses.
								</p>

								<div className="flex flex-col sm:flex-row gap-4">
									<button
										onClick={() => scrollTo('portfolio')}
										className="px-8 py-4 rounded bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1"
									>
										View My Work <ChevronRight size={18} />
									</button>
									<button
										onClick={() => scrollTo('contact')}
										className="px-8 py-4 rounded bg-transparent text-foreground border border-border font-semibold flex items-center justify-center hover:border-primary hover:text-primary transition-all hover:-translate-y-1"
									>
										Hire Me
									</button>
								</div>
							</motion.div>

							<motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, type: "spring" }} className="relative hidden lg:block" >
								<div className="aspect-square md:aspect-4/3 rounded-2xl bg-card/40 backdrop-blur-sm border border-border p-6 shadow-2xl relative overflow-hidden">
									<div className="flex items-center gap-2 mb-6 border-b border-border/50 pb-4">
										<div className="flex gap-2">
											<div className="w-3 h-3 rounded-full bg-red-500/80"></div>
											<div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
											<div className="w-3 h-3 rounded-full bg-green-500/80"></div>
										</div>
										<div className="text-xs text-muted-foreground font-mono ml-4 flex items-center gap-2">
											<Code2 size={14} className="text-primary" />
											rahul-kar.js
										</div>
									</div>

									<pre className="font-mono text-sm leading-relaxed overflow-x-auto">
										<code>
											<span className="text-pink-400">import</span> {'{'} <span className="text-blue-300">MERNStack</span>, <span className="text-blue-300">ReactNative</span> {'}'} <span className="text-pink-400">from</span> <span className="text-green-400">'@tech/stack'</span>;<br /><br />
											<span className="text-pink-400">class</span> <span className="text-yellow-200">Developer</span> {'{'}<br />
											{'  '}name = <span className="text-green-400">'Rahul Kar'</span>;<br />
											{'  '}role = <span className="text-green-400">'Full Stack Engineer'</span>;<br /><br />
											{'  '}<span className="text-blue-400">buildSolutions</span>(client) {'{'}<br />
											{'    '}<span className="text-pink-400">return</span> {'{'}<br />
											{'      '}web: <span className="text-pink-400">new</span> <span className="text-yellow-200">MERNStack</span>(),<br />
											{'      '}mobile: <span className="text-pink-400">new</span> <span className="text-yellow-200">ReactNative</span>(),<br />
											{'      '}quality: <span className="text-blue-400">true</span>,<br />
											{'      '}delivery: <span className="text-green-400">'fast & scalable'</span><br />
											{'    '}{'}'};<br />
											{'  '}{'}'}<br />
											{'}'}
										</code>
									</pre>
									<div className="absolute top-0 left-0 w-full h-0.5 bg-primary/50 shadow-[0_0_15px_rgba(59,130,246,0.8)] animate-[scan_3s_ease-in-out_infinite]" />
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Services Section */}
				<section id="services" className="py-24 bg-card/20 border-y border-border/30 relative">
					<div className="container mx-auto px-6 md:px-12">
						<div className="mb-16 md:w-2/3">
							<h2 className="text-3xl md:text-5xl font-bold mb-4">Core <span className="text-primary">Services</span></h2>
							<p className="text-muted-foreground text-lg font-light">Comprehensive digital solutions engineered for scale, performance, and exceptional user experience.</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
							{[
								{ icon: <MonitorSmartphone size={28} />, title: "Full-Stack Web Apps", desc: "End-to-end MERN stack applications with robust architectures, secure APIs, and responsive frontends." },
								{ icon: <Code2 size={28} />, title: "Frontend Development", desc: "Pixel-perfect, highly interactive user interfaces built with React, JavaScript, and Tailwind CSS." },
								{ icon: <Terminal size={28} />, title: "Mobile Applications", desc: "Cross-platform mobile apps for iOS and Android using React Native, delivering native-like performance." },
								{ icon: <Server size={28} />, title: "Backend Architecture", desc: "Scalable Node.js/Express servers with MongoDB, optimized for high traffic and complex data structures." },
								{ icon: <ShieldCheck size={28} />, title: "E-Commerce Solutions", desc: "Custom online stores with secure payment gateways, inventory management, and tailored checkout flows." },
								{ icon: <Zap size={28} />, title: "Performance Optimization", desc: "Auditing and refactoring existing codebases to dramatically improve speed, SEO, and accessibility." },
							].map((service, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-100px" }}
									transition={{ duration: 0.5, delay: i * 0.1 }}
									className="bg-card border border-border p-8 rounded-2xl hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5"
								>
									<div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
										{service.icon}
									</div>
									<h3 className="text-xl font-bold mb-3">{service.title}</h3>
									<p className="text-muted-foreground leading-relaxed text-sm">{service.desc}</p>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Tech Stack */}
				<section id="tech-stack" className="py-24 relative overflow-hidden">
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-200 bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

					<div className="container mx-auto px-6 md:px-12 relative z-10">
						<div className="text-center mb-16 max-w-2xl mx-auto">
							<h2 className="text-3xl md:text-5xl font-bold mb-4">Tech <span className="text-primary">Arsenal</span></h2>
							<p className="text-muted-foreground text-lg font-light">Specialized in modern JavaScript ecosystems to deliver robust, maintainable solutions.</p>
						</div>

						<div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
							{[
								{ icon: <SiMongodb size={40} />, name: "MongoDB", color: "group-hover:text-[#47A248]" },
								{ icon: <SiExpress size={40} />, name: "Express", color: "group-hover:text-white" },
								{ icon: <SiReact size={40} />, name: "React", color: "group-hover:text-[#61DAFB]" },
								{ icon: <SiNodedotjs size={40} />, name: "Node.js", color: "group-hover:text-[#339933]" },
								{ icon: <SiTypescript size={40} />, name: "TypeScript", color: "group-hover:text-[#3178C6]" },
								// { icon: <SiTailwindcss size={40} />, name: "Tailwind", color: "group-hover:text-[#06B6D4]" },
								// { icon: <SiBootstrap size={40} />, name: "Bootstrap", color: "group-hover:text-[#7952B3]" },
								{ icon: <SiReact size={40} />, name: "React Native", color: "group-hover:text-[#61DAFB]" },
							].map((tech, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, scale: 0.9 }}
									whileInView={{ opacity: 1, scale: 1 }}
									viewport={{ once: true }}
									transition={{ duration: 0.4, delay: i * 0.05 }}
									className={`group flex flex-col items-center justify-center gap-4 bg-card border border-border rounded-2xl p-8 text-muted-foreground transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)] hover:border-primary/40 hover:bg-card/80`}
								>
									<div className={`transition-colors duration-300 ${tech.color}`}>
										{tech.icon}
									</div>
									<span className="text-lg font-semibold font-mono tracking-wide">{tech.name}</span>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Portfolio */}
				<section id="portfolio" className="py-24 bg-card/20 border-y border-border/30">
					<div className="container mx-auto px-6 md:px-12">
						<div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
							<div className="md:w-2/3">
								<h2 className="text-3xl md:text-5xl font-bold mb-4">Selected <span className="text-primary">Works</span></h2>
								<p className="text-muted-foreground text-lg font-light">A showcase of complex problems solved through elegant code and intuitive design.</p>
							</div>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 ">
							{[
								{
									title: "FinTech Dashboard",
									desc: "A comprehensive financial analytics dashboard with real-time data visualization, built with React, Redux, and Node.js.",
									tags: ["React", "Redux", "Node.js", "MongoDB"],
									color: "from-blue-600/20 to-purple-600/20",
									icon: FinTech
									// icon: <span className="text-blue-400 font-mono text-2xl font-bold">$</span>
								},
								{
									title: "E-Commerce Platform",
									desc: "High-conversion online store with advanced filtering, cart management, and seamless Stripe integration.",
									tags: ["MERN", "JavaScript", "Tailwind"],
									color: "from-emerald-600/20 to-teal-600/20",
									icon: ECommerce
									// icon: <span className="text-emerald-400 font-mono text-2xl font-bold">#</span>
								},
								{
									title: "Health & Fitness App",
									desc: "Cross-platform mobile application for workout tracking and nutritional planning, featuring offline support.",
									tags: ["React Native", "Express", "MongoDB"],
									color: "from-orange-600/20 to-red-600/20",
									icon: Health
									// icon: <span className="text-orange-400 font-mono text-2xl font-bold">+</span>
								},
								{
									title: "TalentFlow",
									desc: "A full-featured HR Management system for handling employee records, attendance tracking, leave management, and payroll processing, featuring role-based access and real-time dashboard analytics.",
									tags: ["React Native", "Express", "MongoDB"],
									color: "from-orange-600/20 to-red-600/20",
									icon: HRMS
									// icon: <span className="text-orange-400 font-mono text-2xl font-bold">+</span>
								},
								{
									title: "Inventory Management",
									desc: "A robust inventory management system for tracking stock levels, managing orders, and generating real-time reports, featuring role-based access and efficient data handling.",
									tags: ["React", "Node.js", "Express", "MongoDB"],
									color: "from-orange-600/20 to-red-600/20",
									icon: IMT
									// icon: <span className="text-orange-400 font-mono text-2xl font-bold">+</span>
								}
							].map((project, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.6, delay: i * 0.1 }}
									className="group bg-card rounded-2xl border border-border overflow-hidden flex flex-col h-full hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
								>

									<div className={`h-52 ${project.color} relative overflow-hidden`}>
										<img
											src={project.icon}
											alt={project.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
										/>
									</div>

									<div className="p-8 flex flex-col grow">
										<h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors capitalize">{project.title}</h3>
										<p className="text-muted-foreground mb-8 grow text-sm leading-relaxed">{project.desc}</p>

										<div className="flex flex-wrap gap-2 mb-8">
											{project.tags.map(tag => (
												<span key={tag} className="px-3 py-1 bg-background border border-border text-foreground text-xs rounded-full font-medium">
													{tag}
												</span>
											))}
										</div>

										{/* <button className="w-full py-3 rounded bg-background border border-border hover:border-primary hover:text-primary transition-all font-semibold flex items-center justify-center gap-2 group/btn">
											View Project <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
										</button> */}
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* About Section */}
				<section id="about" className="py-24 relative overflow-hidden">
					<div className="container mx-auto px-6 md:px-12">
						<div className="grid md:grid-cols-2 gap-16 items-center">
							<motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative" >
								<div className="aspect-4/5 max-w-md mx-auto rounded-3xl bg-card border border-border p-4 relative z-10">
									<div className="w-full h-full rounded-2xl bg-muted overflow-hidden relative">
										<div className="absolute inset-0 flex items-center justify-center text-muted-foreground/30 bg-background/50">
											<User size={120} />
										</div>
										<div className="absolute inset-0 bg-linear-to-t from-background/80 to-transparent pointer-events-none" />
									</div>
								</div>
								<div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl -z-10" />
								<div className="absolute -top-6 -left-6 w-40 h-40 bg-blue-600/20 rounded-full blur-[50px] -z-10" />
								<div className="absolute top-1/2 -right-8 w-16 h-16 bg-card border border-border rounded-xl shadow-xl flex items-center justify-center text-primary z-20 animate-bounce" style={{ animationDuration: '3s' }}>
									<Code2 size={24} />
								</div>
							</motion.div>

							<motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} >
								<h2 className="text-3xl md:text-5xl font-bold mb-6">The Dev Behind The <span className="text-primary">Code.</span></h2>
								<p className="text-muted-foreground text-lg mb-6 leading-relaxed font-light">
									Hi, I'm RK, a passionate MERN stack developer dedicated to building elegant, scalable, and high-performance digital products. With years of experience traversing the full stack, I specialize in translating complex business requirements into seamless technical solutions.
								</p>
								<p className="text-muted-foreground text-lg mb-10 leading-relaxed font-light">
									My approach is rooted in clean architecture, modern design patterns, and an unwavering commitment to quality. Whether it's a responsive web app or a cross-platform mobile application, I build with the future in mind.
								</p>

								<div className="grid grid-cols-2 gap-6">
									<div className="border-l-2 border-primary pl-4">
										<div className="text-3xl font-bold text-foreground mb-1">2+</div>
										<div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Years Experience</div>
									</div>
									<div className="border-l-2 border-primary pl-4">
										<div className="text-3xl font-bold text-foreground mb-1">12+</div>
										<div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Projects Delivered</div>
									</div>
								</div>
							</motion.div>
						</div>
					</div>
				</section>

				{/* Why Choose Me */}
				<section id="why-me" className="py-24 bg-card/20 border-y border-border/30">
					<div className="container mx-auto px-6 md:px-12">
						<div className="text-center mb-16 max-w-2xl mx-auto">
							<h2 className="text-3xl md:text-5xl font-bold mb-4">Why Partner With <span className="text-primary">Me?</span></h2>
							<p className="text-muted-foreground text-lg font-light">Delivering exceptional value through technical expertise and professional execution.</p>
						</div>

						<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
							{[
								{ icon: <Zap size={24} />, title: "Fast Delivery", desc: "Agile development methodologies ensuring rapid prototyping and timely product launches." },
								{ icon: <Cpu size={24} />, title: "Modern Tech", desc: "Leveraging the latest frameworks and libraries to build future-proof, scalable applications." },
								{ icon: <Code2 size={24} />, title: "Clean Code", desc: "Maintainable, well-documented, and thoroughly tested codebases that your team will love." },
								{ icon: <MonitorSmartphone size={24} />, title: "Responsive Design", desc: "Pixel-perfect interfaces that look and perform flawlessly across all devices and screen sizes." },
								{ icon: <ShieldCheck size={24} />, title: "Secure Architecture", desc: "Implementing industry-standard security practices to protect user data and business logic." },
								{ icon: <Clock size={24} />, title: "Reliable Support", desc: "Ongoing maintenance and responsive communication to ensure your application runs smoothly." },
							].map((reason, i) => (
								<motion.div
									key={i}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true }}
									transition={{ duration: 0.5, delay: i * 0.1 }}
									className="flex gap-4 p-6 bg-background rounded-2xl border border-border hover:border-primary/30 transition-colors"
								>
									<div className="mt-1 w-10 h-10 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
										{reason.icon}
									</div>
									<div>
										<h3 className="text-lg font-bold mb-2">{reason.title}</h3>
										<p className="text-muted-foreground text-sm leading-relaxed">{reason.desc}</p>
									</div>
								</motion.div>
							))}
						</div>
					</div>
				</section>

				{/* Contact */}
				<section id="contact" className="py-24 relative overflow-hidden">
					<div className="absolute top-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

					<div className="container mx-auto px-6 md:px-12 relative z-10">
						<div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
							<div>
								<h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Let's build something <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-blue-400">great.</span></h2>
								<p className="text-muted-foreground text-lg mb-12 font-light leading-relaxed">
									Ready to transform your idea into a digital reality? Reach out to discuss your project requirements, timeline, and how I can help your business grow.
								</p>

								<div className="space-y-8">
									<div className="flex items-center gap-6 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
										<div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
											<Mail size={24} />
										</div>
										<div>
											<p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Email</p>
											<p className="font-semibold text-lg text-foreground hover:text-primary transition-colors cursor-pointer">rahulkar.996@gmail.com</p>
										</div>
									</div>

									<div className="flex items-center gap-6 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
										<div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
											<Phone size={24} />
										</div>
										<div>
											<p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Phone</p>
											<p className="font-semibold text-lg text-foreground hover:text-primary transition-colors cursor-pointer">+91-6290626683</p>
										</div>
									</div>

									<div className="flex items-center gap-6 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors">
										<div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
											<MapPin size={24} />
										</div>
										<div>
											<p className="text-sm text-muted-foreground font-medium uppercase tracking-wider mb-1">Location</p>
											{/* <p className="font-semibold text-lg text-foreground">Available India (Remote)</p> */}
											<p className="font-semibold text-lg text-foreground">Kalyani, West Bengal</p>
										</div>
									</div>
								</div>
							</div>

							<motion.div
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.6 }}
								className="bg-card/50 backdrop-blur border border-border p-8 md:p-10 rounded-3xl shadow-2xl shadow-primary/5"
							>
								{contact.status === 'success' ? (
									<div className="h-full flex flex-col items-center justify-center text-center py-20">
										<motion.div
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{ type: "spring" }}
											className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6"
										>
											<CheckCircle2 size={40} />
										</motion.div>
										<h3 className="text-3xl font-bold mb-3 text-foreground">Message Sent!</h3>
										<p className="text-muted-foreground text-lg font-light">Thank you for reaching out. I'll get back to you within 24 hours.</p>
									</div>
								) : (
									<form onSubmit={handleContactSubmit} className="flex flex-col gap-6">
										<div className="grid md:grid-cols-2 gap-6">
											<div className="flex flex-col gap-2">
												<label htmlFor="name" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Name</label>
												<input
													type="text"
													id="name"
													required
													value={contact.name}
													autoComplete="name"
													onChange={(e) => dispatch(setField({ field: 'name', value: e.target.value }))}
													className="bg-background border border-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
													placeholder="John Doe"
												/>
											</div>
											<div className="flex flex-col gap-2">
												<label htmlFor="email" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
												<input
													type="email"
													id="email"
													required
													value={contact.email}
													autoComplete="email"
													onChange={(e) => dispatch(setField({ field: 'email', value: e.target.value }))}
													className="bg-background border border-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground"
													placeholder="john@example.com"
												/>
											</div>
										</div>

										<div className="flex flex-col gap-2">
											<label htmlFor="projectType" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Project Type</label>
											<div className="relative">
												<select
													id="projectType"
													value={contact.projectType}
													autoComplete="on"
													onChange={(e) => dispatch(setField({ field: 'projectType', value: e.target.value }))}
													className="w-full bg-background border border-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none text-foreground"
												>
													<option value="website">Website Development</option>
													<option value="webapp">Web Application</option>
													<option value="mobile">Mobile App</option>
													<option value="ecommerce">E-Commerce</option>
													<option value="other">Other</option>
												</select>
												<div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
													<ChevronRight size={16} className="rotate-90" />
												</div>
											</div>
										</div>

										<div className="flex flex-col gap-2">
											<label htmlFor="message" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Project Details</label>
											<textarea
												id="message"
												required
												rows={5}
												value={contact.message}
												autoComplete="off"
												onChange={(e) => dispatch(setField({ field: 'message', value: e.target.value }))}
												className="bg-background border border-border rounded-xl px-5 py-4 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none text-foreground"
												placeholder="Tell me about your project requirements..."
											></textarea>
										</div>

										<button
											type="submit"
											disabled={contact.status === 'pending'}
											className="mt-4 bg-primary text-primary-foreground font-bold uppercase tracking-wider py-4 rounded-xl hover:bg-primary/90 transition-all disabled:opacity-70 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-1"
										>
											{contact.status === 'pending' ? (
												<>
													<div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
													Sending...
												</>
											) : 'Send Message'}
										</button>
									</form>
								)}
							</motion.div>
						</div>
					</div>
				</section>
			</main>

			<AnimatePresence>
				{showTop && (
					<motion.button
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 20 }}
						onClick={scrollToTop}
						className="fixed bottom-6 hover:cursor-pointer right-6 z-50 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:bg-primary/90 hover:-translate-y-1 transition-all"
					>
						<ChevronUp size={20} />
					</motion.button>
				)}
			</AnimatePresence>

			{/* Footer */}
			<footer className="border-t border-border/50 pt-16 pb-8 bg-card/30">
				<div className="container mx-auto px-6 md:px-12">
					<div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
						<div className="flex flex-col items-center md:items-start gap-4">
							<div className="text-5xl font-bold font-mono tracking-tighter flex items-center gap-1 cursor-pointer" onClick={() => scrollTo('home')}>
								<span className="text-primary">&lt;</span>
								<span className="text-foreground">RK</span>
								<span className="text-primary">/&gt;</span>
							</div>
							<p className="text-muted-foreground text-base font-medium">Crafting digital experiences that matter.</p>
						</div>

						<div className="flex gap-4">
							<a href="https://github.com/RAHUL-KAR-Kalyani" target="_blank" rel="noopener noreferrer"
								className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:border-border hover:text-black hover:bg-amber-100 hover:-translate-y-1 transition-all shadow-sm ">
								{/* <Github size={20} /> */}
								<SiGithub size={30} />
							</a>
							<a href="https://www.linkedin.com/in/rahulkar26/" target="_blank" rel="noopener noreferrer"
								className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:border-blue-500 hover:bg-blue-500 hover:text-white hover:-translate-y-1 transition-all shadow-sm hover">
								{/* <Linkedin size={20} /> */}
								<FaLinkedinIn size={30} />
							</a>
							<a href="https://twitter.com/rahulkar26" target="_blank" rel="noopener noreferrer"
								className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-[#1DA1F2] hover:bg-[#FAF9F6] hover:-translate-y-1 transition-all shadow-sm">
								{/* <Twitter size={20} /> */}
								<FaTwitter size={30} />
							</a>
						</div>
					</div>

					<div className="pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground font-medium">
						<p>
							<span style={{ fontSize: "2em" }}>&reg;</span>
							{new Date().getFullYear()} Rahul Kar. All rights reserved.
						</p>
						<div className="flex gap-6">
							<a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
							<a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
						</div>
					</div>
				</div>
			</footer>
		</div>
	);
};

export default Home;
