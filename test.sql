toc.dat                                                                                             0000600 0004000 0002000 00000041221 14101764200 0014432 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        PGDMP       '    +                y        	   ecewizard #   12.7 (Ubuntu 12.7-0ubuntu0.20.04.1) #   12.7 (Ubuntu 12.7-0ubuntu0.20.04.1) 8    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false         �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false         �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false         �           1262    16385 	   ecewizard    DATABASE     s   CREATE DATABASE ecewizard WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';
    DROP DATABASE ecewizard;
                postgres    false         �            1259    24708 
   attendance    TABLE       CREATE TABLE public.attendance (
    "timestamp" timestamp without time zone NOT NULL,
    reporter character varying(10) NOT NULL,
    student_id integer NOT NULL,
    data character varying(20) NOT NULL,
    coteacher character varying(10),
    id integer NOT NULL
);
    DROP TABLE public.attendance;
       public         heap    postgres    false         �            1259    24706    attendance_id_seq    SEQUENCE     �   CREATE SEQUENCE public.attendance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.attendance_id_seq;
       public          postgres    false    211         �           0    0    attendance_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.attendance_id_seq OWNED BY public.attendance.id;
          public          postgres    false    210         �            1259    24577    calendar    TABLE     0   CREATE TABLE public.calendar (
    date date
);
    DROP TABLE public.calendar;
       public         heap    postgres    false         �            1259    24665    compile_dates    TABLE     g   CREATE TABLE public.compile_dates (
    date date NOT NULL,
    type character varying(30) NOT NULL
);
 !   DROP TABLE public.compile_dates;
       public         heap    postgres    false         �            1259    24758 	   goal_data    TABLE     =  CREATE TABLE public.goal_data (
    "timestamp" timestamp without time zone NOT NULL,
    iep_goal_id integer NOT NULL,
    type character varying(20) NOT NULL,
    response integer NOT NULL,
    responder character varying(10) NOT NULL,
    coteacher_login character varying(10) NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public.goal_data;
       public         heap    postgres    false         �            1259    24756    goal_data_id_seq    SEQUENCE     �   CREATE SEQUENCE public.goal_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.goal_data_id_seq;
       public          postgres    false    214         �           0    0    goal_data_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.goal_data_id_seq OWNED BY public.goal_data.id;
          public          postgres    false    213         �            1259    24625    iep    TABLE     �   CREATE TABLE public.iep (
    start_date date NOT NULL,
    end_date date NOT NULL,
    student_id integer NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public.iep;
       public         heap    postgres    false         �            1259    24638    iep_goal    TABLE       CREATE TABLE public.iep_goal (
    iep_id integer NOT NULL,
    area character varying(20) NOT NULL,
    goal character varying(1000) NOT NULL,
    data_question character varying(500) NOT NULL,
    response_type character varying(20) NOT NULL,
    id integer NOT NULL
);
    DROP TABLE public.iep_goal;
       public         heap    postgres    false         �            1259    24743    iep_goal_id_seq    SEQUENCE     �   CREATE SEQUENCE public.iep_goal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.iep_goal_id_seq;
       public          postgres    false    208         �           0    0    iep_goal_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.iep_goal_id_seq OWNED BY public.iep_goal.id;
          public          postgres    false    212         �            1259    24623 
   iep_id_seq    SEQUENCE     �   CREATE SEQUENCE public.iep_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 !   DROP SEQUENCE public.iep_id_seq;
       public          postgres    false    207         �           0    0 
   iep_id_seq    SEQUENCE OWNED BY     9   ALTER SEQUENCE public.iep_id_seq OWNED BY public.iep.id;
          public          postgres    false    206         �            1259    24600    student    TABLE     �   CREATE TABLE public.student (
    id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    disability character varying(20) NOT NULL,
    active boolean NOT NULL
);
    DROP TABLE public.student;
       public         heap    postgres    false         �            1259    24580    teacher    TABLE       CREATE TABLE public.teacher (
    login character varying(10) NOT NULL,
    secret character varying(20) NOT NULL,
    email character varying(100) NOT NULL,
    name character varying(200) NOT NULL,
    user_type character varying(10) NOT NULL,
    active boolean NOT NULL
);
    DROP TABLE public.teacher;
       public         heap    postgres    false         �            1259    24605    teachers_students    TABLE       CREATE TABLE public.teachers_students (
    teacher_login character varying(10) NOT NULL,
    student_id integer NOT NULL,
    role character varying(10) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    coteacher_login character varying(10)
);
 %   DROP TABLE public.teachers_students;
       public         heap    postgres    false                    2604    24711    attendance id    DEFAULT     n   ALTER TABLE ONLY public.attendance ALTER COLUMN id SET DEFAULT nextval('public.attendance_id_seq'::regclass);
 <   ALTER TABLE public.attendance ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    210    211                    2604    24761    goal_data id    DEFAULT     l   ALTER TABLE ONLY public.goal_data ALTER COLUMN id SET DEFAULT nextval('public.goal_data_id_seq'::regclass);
 ;   ALTER TABLE public.goal_data ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214                    2604    24628    iep id    DEFAULT     `   ALTER TABLE ONLY public.iep ALTER COLUMN id SET DEFAULT nextval('public.iep_id_seq'::regclass);
 5   ALTER TABLE public.iep ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    207    206    207                    2604    24745    iep_goal id    DEFAULT     j   ALTER TABLE ONLY public.iep_goal ALTER COLUMN id SET DEFAULT nextval('public.iep_goal_id_seq'::regclass);
 :   ALTER TABLE public.iep_goal ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    208         �          0    24708 
   attendance 
   TABLE DATA           \   COPY public.attendance ("timestamp", reporter, student_id, data, coteacher, id) FROM stdin;
    public          postgres    false    211       3000.dat �          0    24577    calendar 
   TABLE DATA           (   COPY public.calendar (date) FROM stdin;
    public          postgres    false    202       2991.dat �          0    24665    compile_dates 
   TABLE DATA           3   COPY public.compile_dates (date, type) FROM stdin;
    public          postgres    false    209       2998.dat �          0    24758 	   goal_data 
   TABLE DATA           m   COPY public.goal_data ("timestamp", iep_goal_id, type, response, responder, coteacher_login, id) FROM stdin;
    public          postgres    false    214       3003.dat �          0    24625    iep 
   TABLE DATA           C   COPY public.iep (start_date, end_date, student_id, id) FROM stdin;
    public          postgres    false    207       2996.dat �          0    24638    iep_goal 
   TABLE DATA           X   COPY public.iep_goal (iep_id, area, goal, data_question, response_type, id) FROM stdin;
    public          postgres    false    208       2997.dat �          0    24600    student 
   TABLE DATA           P   COPY public.student (id, first_name, last_name, disability, active) FROM stdin;
    public          postgres    false    204       2993.dat �          0    24580    teacher 
   TABLE DATA           P   COPY public.teacher (login, secret, email, name, user_type, active) FROM stdin;
    public          postgres    false    203       2992.dat �          0    24605    teachers_students 
   TABLE DATA           s   COPY public.teachers_students (teacher_login, student_id, role, start_date, end_date, coteacher_login) FROM stdin;
    public          postgres    false    205       2994.dat �           0    0    attendance_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.attendance_id_seq', 1, false);
          public          postgres    false    210         �           0    0    goal_data_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.goal_data_id_seq', 1, false);
          public          postgres    false    213         �           0    0    iep_goal_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.iep_goal_id_seq', 11, true);
          public          postgres    false    212         �           0    0 
   iep_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('public.iep_id_seq', 8, true);
          public          postgres    false    206         $           2606    24713    attendance attendance_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_pkey;
       public            postgres    false    211         "           2606    24669     compile_dates compile_dates_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.compile_dates
    ADD CONSTRAINT compile_dates_pkey PRIMARY KEY (date, type);
 J   ALTER TABLE ONLY public.compile_dates DROP CONSTRAINT compile_dates_pkey;
       public            postgres    false    209    209         &           2606    24763    goal_data goal_data_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.goal_data
    ADD CONSTRAINT goal_data_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.goal_data DROP CONSTRAINT goal_data_pkey;
       public            postgres    false    214                     2606    24747    iep_goal iep_goal_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.iep_goal
    ADD CONSTRAINT iep_goal_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.iep_goal DROP CONSTRAINT iep_goal_pkey;
       public            postgres    false    208                    2606    24630    iep iep_pkey 
   CONSTRAINT     J   ALTER TABLE ONLY public.iep
    ADD CONSTRAINT iep_pkey PRIMARY KEY (id);
 6   ALTER TABLE ONLY public.iep DROP CONSTRAINT iep_pkey;
       public            postgres    false    207                    2606    24604    student student_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.student DROP CONSTRAINT student_pkey;
       public            postgres    false    204                    2606    24584    teacher teacher_pkey 
   CONSTRAINT     U   ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (login);
 >   ALTER TABLE ONLY public.teacher DROP CONSTRAINT teacher_pkey;
       public            postgres    false    203                    2606    24609 (   teachers_students teachers_students_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.teachers_students
    ADD CONSTRAINT teachers_students_pkey PRIMARY KEY (teacher_login, student_id, role);
 R   ALTER TABLE ONLY public.teachers_students DROP CONSTRAINT teachers_students_pkey;
       public            postgres    false    205    205    205         -           2606    24724 $   attendance attendance_coteacher_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_coteacher_fkey FOREIGN KEY (coteacher) REFERENCES public.teacher(login);
 N   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_coteacher_fkey;
       public          postgres    false    2840    203    211         +           2606    24714 #   attendance attendance_reporter_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_reporter_fkey FOREIGN KEY (reporter) REFERENCES public.teacher(login);
 M   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_reporter_fkey;
       public          postgres    false    2840    211    203         ,           2606    24719 %   attendance attendance_student_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id);
 O   ALTER TABLE ONLY public.attendance DROP CONSTRAINT attendance_student_id_fkey;
       public          postgres    false    2842    211    204         0           2606    24774 (   goal_data goal_data_coteacher_login_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.goal_data
    ADD CONSTRAINT goal_data_coteacher_login_fkey FOREIGN KEY (coteacher_login) REFERENCES public.teacher(login);
 R   ALTER TABLE ONLY public.goal_data DROP CONSTRAINT goal_data_coteacher_login_fkey;
       public          postgres    false    214    2840    203         .           2606    24764 $   goal_data goal_data_iep_goal_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.goal_data
    ADD CONSTRAINT goal_data_iep_goal_id_fkey FOREIGN KEY (iep_goal_id) REFERENCES public.iep_goal(id);
 N   ALTER TABLE ONLY public.goal_data DROP CONSTRAINT goal_data_iep_goal_id_fkey;
       public          postgres    false    2848    214    208         /           2606    24769 "   goal_data goal_data_responder_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.goal_data
    ADD CONSTRAINT goal_data_responder_fkey FOREIGN KEY (responder) REFERENCES public.teacher(login);
 L   ALTER TABLE ONLY public.goal_data DROP CONSTRAINT goal_data_responder_fkey;
       public          postgres    false    214    203    2840         *           2606    24647    iep_goal iep_goal_iep_id_fkey    FK CONSTRAINT     y   ALTER TABLE ONLY public.iep_goal
    ADD CONSTRAINT iep_goal_iep_id_fkey FOREIGN KEY (iep_id) REFERENCES public.iep(id);
 G   ALTER TABLE ONLY public.iep_goal DROP CONSTRAINT iep_goal_iep_id_fkey;
       public          postgres    false    2846    207    208         )           2606    24631    iep iep_student_id_fkey    FK CONSTRAINT     {   ALTER TABLE ONLY public.iep
    ADD CONSTRAINT iep_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id);
 A   ALTER TABLE ONLY public.iep DROP CONSTRAINT iep_student_id_fkey;
       public          postgres    false    2842    204    207         (           2606    24615 3   teachers_students teachers_students_student_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teachers_students
    ADD CONSTRAINT teachers_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id);
 ]   ALTER TABLE ONLY public.teachers_students DROP CONSTRAINT teachers_students_student_id_fkey;
       public          postgres    false    204    205    2842         '           2606    24610 6   teachers_students teachers_students_teacher_login_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.teachers_students
    ADD CONSTRAINT teachers_students_teacher_login_fkey FOREIGN KEY (teacher_login) REFERENCES public.teacher(login);
 `   ALTER TABLE ONLY public.teachers_students DROP CONSTRAINT teachers_students_teacher_login_fkey;
       public          postgres    false    205    203    2840                                                                                                                                                                                                                                                                                                                                                                                       3000.dat                                                                                            0000600 0004000 0002000 00000000005 14101764200 0014222 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2991.dat                                                                                            0000600 0004000 0002000 00000000751 14101764200 0014254 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2021-08-15
2021-08-16
2021-08-17
2021-07-15
2021-07-16
2021-07-17
2021-07-18
2021-07-19
2021-07-20
2021-07-21
2021-07-22
2021-07-23
2021-07-24
2021-07-25
2021-07-26
2021-07-27
2021-07-28
2021-07-29
2021-08-01
2021-08-02
2021-08-03
2021-08-04
2021-08-05
2021-08-06
2021-08-07
2021-08-08
2021-08-09
2021-08-10
2021-08-11
2021-08-12
2021-08-13
2021-08-01
2021-08-02
2021-08-03
2021-08-04
2021-08-05
2021-08-06
2021-08-07
2021-08-08
2021-08-09
2021-08-10
2021-08-11
2021-08-12
2021-08-13
\.


                       2998.dat                                                                                            0000600 0004000 0002000 00000000005 14101764200 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           3003.dat                                                                                            0000600 0004000 0002000 00000000005 14101764200 0014225 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        \.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           2996.dat                                                                                            0000600 0004000 0002000 00000000042 14101764200 0014252 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        2020-07-30	2022-07-29	3333	8
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              2997.dat                                                                                            0000600 0004000 0002000 00000000420 14101764200 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        8	All	Behavior	Did Tom behave himself?	boolean	8
8	BIP	BIP	Did Tom exhibit problem behavior in your class?	boolean	9
8	meta	Complete work	Did Tom  complete their work today?	Boolean	10
8	meta	Meet behavior expectations	Did Tom  meet behavior expectations?	Boolean	11
\.


                                                                                                                                                                                                                                                2993.dat                                                                                            0000600 0004000 0002000 00000000136 14101764200 0014253 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        1111	Anameek	Van Vleuten	OHI	t
2222	Anna 	Van der Breggan	MMD	t
3333	Tom 	Piddcock	OHI	t
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                  2992.dat                                                                                            0000600 0004000 0002000 00000001035 14101764200 0014251 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        cfreed02	Chopshop234	cayden.reedle@teacher.com	Cayden Reedle	ADMIN	t
chches01	Chopshop234	che.chesterton@teacher.com	Che Chesterton	DATA	t
pman02	Chopshop234	pac.man@teacher.com	Pac Man	TOR	t
rmpitt01	Chopshop234	rad.pitts@teacher.com	Rad Pitts	DATA	t
swmeal01	Chopshop234	sally.mealticket@teacher.com	Sally Mealticket	DATA	t
pmcrab01	Chopshop234	portia.crablegs@teacher.com	Portia Crablegs	TOR	t
sktras01	Chopshop234	stig.trasterton@teacher.com	Stig Trasterton	DATA	t
fefuel01	Chopshop234	ferris.fueler@teacher.com	Ferris Fueler	TOR	t
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   2994.dat                                                                                            0000600 0004000 0002000 00000001117 14101764200 0014254 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        cfreed02	1111	English	2021-07-29	2021-08-17	fefuel01
chches01	1111	Math	2021-07-29	2021-08-17	\N
pman02	1111	Other	2021-07-29	2021-08-17	\N
pmcrab01	1111	Other	2021-07-29	2021-08-17	\N
cfreed02	1111	TOR	2021-07-29	2021-08-17	\N
cfreed02	2222	English	2021-07-29	1970-01-01	\N
swmeal01	2222	Math	2021-07-29	1970-01-01	\N
pmcrab01	2222	Other	2021-07-29	1970-01-01	\N
cfreed02	2222	TOR	2021-07-29	2021-08-17	\N
sktras01	3333	English	2021-07-29	1970-01-01	\N
chches01	3333	Math	2021-07-29	1970-01-01	\N
rmpitt01	3333	Other	2021-07-29	1970-01-01	\N
cfreed02	3333	TOR	2021-07-29	2021-08-17	\N
\.


                                                                                                                                                                                                                                                                                                                                                                                                                                                 restore.sql                                                                                         0000600 0004000 0002000 00000033005 14101764200 0015360 0                                                                                                    ustar 00postgres                        postgres                        0000000 0000000                                                                                                                                                                        --
-- NOTE:
--
-- File paths need to be edited. Search for $$PATH$$ and
-- replace it with the path to the directory containing
-- the extracted data files.
--
--
-- PostgreSQL database dump
--

-- Dumped from database version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.7 (Ubuntu 12.7-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE ecewizard;
--
-- Name: ecewizard; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE ecewizard WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C.UTF-8' LC_CTYPE = 'C.UTF-8';


ALTER DATABASE ecewizard OWNER TO postgres;

\connect ecewizard

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: attendance; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.attendance (
    "timestamp" timestamp without time zone NOT NULL,
    reporter character varying(10) NOT NULL,
    student_id integer NOT NULL,
    data character varying(20) NOT NULL,
    coteacher character varying(10),
    id integer NOT NULL
);


ALTER TABLE public.attendance OWNER TO postgres;

--
-- Name: attendance_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.attendance_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.attendance_id_seq OWNER TO postgres;

--
-- Name: attendance_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.attendance_id_seq OWNED BY public.attendance.id;


--
-- Name: calendar; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calendar (
    date date
);


ALTER TABLE public.calendar OWNER TO postgres;

--
-- Name: compile_dates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.compile_dates (
    date date NOT NULL,
    type character varying(30) NOT NULL
);


ALTER TABLE public.compile_dates OWNER TO postgres;

--
-- Name: goal_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.goal_data (
    "timestamp" timestamp without time zone NOT NULL,
    iep_goal_id integer NOT NULL,
    type character varying(20) NOT NULL,
    response integer NOT NULL,
    responder character varying(10) NOT NULL,
    coteacher_login character varying(10) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.goal_data OWNER TO postgres;

--
-- Name: goal_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.goal_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.goal_data_id_seq OWNER TO postgres;

--
-- Name: goal_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.goal_data_id_seq OWNED BY public.goal_data.id;


--
-- Name: iep; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.iep (
    start_date date NOT NULL,
    end_date date NOT NULL,
    student_id integer NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.iep OWNER TO postgres;

--
-- Name: iep_goal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.iep_goal (
    iep_id integer NOT NULL,
    area character varying(20) NOT NULL,
    goal character varying(1000) NOT NULL,
    data_question character varying(500) NOT NULL,
    response_type character varying(20) NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.iep_goal OWNER TO postgres;

--
-- Name: iep_goal_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.iep_goal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.iep_goal_id_seq OWNER TO postgres;

--
-- Name: iep_goal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.iep_goal_id_seq OWNED BY public.iep_goal.id;


--
-- Name: iep_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.iep_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.iep_id_seq OWNER TO postgres;

--
-- Name: iep_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.iep_id_seq OWNED BY public.iep.id;


--
-- Name: student; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.student (
    id integer NOT NULL,
    first_name character varying(50) NOT NULL,
    last_name character varying(50) NOT NULL,
    disability character varying(20) NOT NULL,
    active boolean NOT NULL
);


ALTER TABLE public.student OWNER TO postgres;

--
-- Name: teacher; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teacher (
    login character varying(10) NOT NULL,
    secret character varying(20) NOT NULL,
    email character varying(100) NOT NULL,
    name character varying(200) NOT NULL,
    user_type character varying(10) NOT NULL,
    active boolean NOT NULL
);


ALTER TABLE public.teacher OWNER TO postgres;

--
-- Name: teachers_students; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.teachers_students (
    teacher_login character varying(10) NOT NULL,
    student_id integer NOT NULL,
    role character varying(10) NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    coteacher_login character varying(10)
);


ALTER TABLE public.teachers_students OWNER TO postgres;

--
-- Name: attendance id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance ALTER COLUMN id SET DEFAULT nextval('public.attendance_id_seq'::regclass);


--
-- Name: goal_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goal_data ALTER COLUMN id SET DEFAULT nextval('public.goal_data_id_seq'::regclass);


--
-- Name: iep id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iep ALTER COLUMN id SET DEFAULT nextval('public.iep_id_seq'::regclass);


--
-- Name: iep_goal id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iep_goal ALTER COLUMN id SET DEFAULT nextval('public.iep_goal_id_seq'::regclass);


--
-- Data for Name: attendance; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.attendance ("timestamp", reporter, student_id, data, coteacher, id) FROM stdin;
\.
COPY public.attendance ("timestamp", reporter, student_id, data, coteacher, id) FROM '$$PATH$$/3000.dat';

--
-- Data for Name: calendar; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.calendar (date) FROM stdin;
\.
COPY public.calendar (date) FROM '$$PATH$$/2991.dat';

--
-- Data for Name: compile_dates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.compile_dates (date, type) FROM stdin;
\.
COPY public.compile_dates (date, type) FROM '$$PATH$$/2998.dat';

--
-- Data for Name: goal_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.goal_data ("timestamp", iep_goal_id, type, response, responder, coteacher_login, id) FROM stdin;
\.
COPY public.goal_data ("timestamp", iep_goal_id, type, response, responder, coteacher_login, id) FROM '$$PATH$$/3003.dat';

--
-- Data for Name: iep; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.iep (start_date, end_date, student_id, id) FROM stdin;
\.
COPY public.iep (start_date, end_date, student_id, id) FROM '$$PATH$$/2996.dat';

--
-- Data for Name: iep_goal; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.iep_goal (iep_id, area, goal, data_question, response_type, id) FROM stdin;
\.
COPY public.iep_goal (iep_id, area, goal, data_question, response_type, id) FROM '$$PATH$$/2997.dat';

--
-- Data for Name: student; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.student (id, first_name, last_name, disability, active) FROM stdin;
\.
COPY public.student (id, first_name, last_name, disability, active) FROM '$$PATH$$/2993.dat';

--
-- Data for Name: teacher; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teacher (login, secret, email, name, user_type, active) FROM stdin;
\.
COPY public.teacher (login, secret, email, name, user_type, active) FROM '$$PATH$$/2992.dat';

--
-- Data for Name: teachers_students; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.teachers_students (teacher_login, student_id, role, start_date, end_date, coteacher_login) FROM stdin;
\.
COPY public.teachers_students (teacher_login, student_id, role, start_date, end_date, coteacher_login) FROM '$$PATH$$/2994.dat';

--
-- Name: attendance_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.attendance_id_seq', 1, false);


--
-- Name: goal_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.goal_data_id_seq', 1, false);


--
-- Name: iep_goal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.iep_goal_id_seq', 11, true);


--
-- Name: iep_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.iep_id_seq', 8, true);


--
-- Name: attendance attendance_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_pkey PRIMARY KEY (id);


--
-- Name: compile_dates compile_dates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.compile_dates
    ADD CONSTRAINT compile_dates_pkey PRIMARY KEY (date, type);


--
-- Name: goal_data goal_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goal_data
    ADD CONSTRAINT goal_data_pkey PRIMARY KEY (id);


--
-- Name: iep_goal iep_goal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iep_goal
    ADD CONSTRAINT iep_goal_pkey PRIMARY KEY (id);


--
-- Name: iep iep_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iep
    ADD CONSTRAINT iep_pkey PRIMARY KEY (id);


--
-- Name: student student_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.student
    ADD CONSTRAINT student_pkey PRIMARY KEY (id);


--
-- Name: teacher teacher_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teacher
    ADD CONSTRAINT teacher_pkey PRIMARY KEY (login);


--
-- Name: teachers_students teachers_students_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers_students
    ADD CONSTRAINT teachers_students_pkey PRIMARY KEY (teacher_login, student_id, role);


--
-- Name: attendance attendance_coteacher_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_coteacher_fkey FOREIGN KEY (coteacher) REFERENCES public.teacher(login);


--
-- Name: attendance attendance_reporter_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_reporter_fkey FOREIGN KEY (reporter) REFERENCES public.teacher(login);


--
-- Name: attendance attendance_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.attendance
    ADD CONSTRAINT attendance_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id);


--
-- Name: goal_data goal_data_coteacher_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goal_data
    ADD CONSTRAINT goal_data_coteacher_login_fkey FOREIGN KEY (coteacher_login) REFERENCES public.teacher(login);


--
-- Name: goal_data goal_data_iep_goal_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goal_data
    ADD CONSTRAINT goal_data_iep_goal_id_fkey FOREIGN KEY (iep_goal_id) REFERENCES public.iep_goal(id);


--
-- Name: goal_data goal_data_responder_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.goal_data
    ADD CONSTRAINT goal_data_responder_fkey FOREIGN KEY (responder) REFERENCES public.teacher(login);


--
-- Name: iep_goal iep_goal_iep_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iep_goal
    ADD CONSTRAINT iep_goal_iep_id_fkey FOREIGN KEY (iep_id) REFERENCES public.iep(id);


--
-- Name: iep iep_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.iep
    ADD CONSTRAINT iep_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id);


--
-- Name: teachers_students teachers_students_student_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers_students
    ADD CONSTRAINT teachers_students_student_id_fkey FOREIGN KEY (student_id) REFERENCES public.student(id);


--
-- Name: teachers_students teachers_students_teacher_login_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.teachers_students
    ADD CONSTRAINT teachers_students_teacher_login_fkey FOREIGN KEY (teacher_login) REFERENCES public.teacher(login);


--
-- PostgreSQL database dump complete
--

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           