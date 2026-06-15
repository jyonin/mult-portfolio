# 포트폴리오 디자인 시스템
> 레퍼런스 1: Smalls (smalls.com) — 에디토리얼 매거진 레이아웃  
> 레퍼런스 2: 타이포그래픽 키워드 하이라이트 Hero (형광 + 라이트 세리프)  
> 작성일: 2026-06-12 | 최종수정: 2026-06-12  
> 고정 기준 문서 — 웹 코딩 시 반드시 이 MD 준수

---

## 1. 디자인 철학

**에디토리얼 매거진 × 타이포그래픽 포트폴리오**

- 레이아웃은 잡지처럼, 콘텐츠는 포트폴리오처럼
- 타이포그래피가 비주얼을 리드한다 (이미지보다 타입이 먼저)
- 여백을 두려워하지 않는다
- 대담하게 크거나, 아주 작거나 — 중간 크기 금지
- 형광 옐로우는 아이디어·에너지를 상징 — 특정 브랜드 톤에 종속되지 않는다
- 발랄하고 경쾌하되, 레이아웃은 정교하게

---

## 2. 컬러 시스템

### 기본 팔레트

| 변수명 | HEX | 용도 |
|---|---|---|
| `--color-primary` | `#FFFF5B` | 형광 옐로우 — 메인 포인트 컬러 |
| `--color-bg-main` | `#F2F2F0` | 메인 배경 (뉴트럴 오프화이트) |
| `--color-bg-section` | `#FFFFFF` | 교차 섹션 배경 |
| `--color-bg-dark` | `#1A1A1A` | 다크 섹션 배경 |
| `--color-text-primary` | `#1A1A1A` | 본문 텍스트 |
| `--color-text-muted` | `#888888` | 보조 텍스트, 캡션 |
| `--color-text-accent` | `#555555` | 카테고리 태그 (중간 회색) |
| `--color-border` | `#E0E0E0` | 카드 테두리, 구분선 |
| `--color-white` | `#FFFFFF` | 카드 배경 |

> **형광 옐로우 #FFFF5B** — 노랑+그린이 섞인 일렉트릭 계열. 배경보다 텍스트 하이라이트 마커로 주로 사용.

### 컬러 사용 원칙

- `--color-primary(#FFFF5B)` 사용처:
  - 텍스트 **하이라이트 마커** (background: #FFFF5B, padding: 0 4px) ← 핵심 용법
  - 섹션 **풀블리드 배경** (Hero, 강조 섹션)
  - 필터 태그 **활성 상태**
  - **절대 그라디언트나 반투명으로 사용 금지**
- 다크 섹션(`#1A1A1A`): Process, Vibe Coding, Footer
- 이미지 위 텍스트: Primary 또는 Dark 오버레이만 허용

---

## 3. 타이포그래피

### 폰트 패밀리

```css
/* ① 한글 전체 + 영문 본문 — Noto Sans KR */
--font-sans: 'Noto Sans KR', 'Helvetica Neue', Arial, sans-serif;
/* weight: 400(Regular), 500(Medium), 700(Bold) */

/* ② 코드, 프롬프트 박스, 모노 레이블 */
--font-mono: 'DM Mono', 'Courier New', monospace;
```

> **Google Fonts CDN 임포트:**
> ```
> Noto+Sans+KR:wght@400;500;700
> DM+Mono:wght@400
> ```

### 폰트 역할 정의

| 역할 | 폰트 | 용도 |
|---|---|---|
| **한글/영문 대제목, 본문 전체** | **Noto Sans KR 700/400** | Hero 타이틀, 섹션 타이틀, 본문, UI — 한글 포함 요소 기본 |
| 영문 소형 UI 요소 | Playfair Display 700 | eyebrow, 카테고리 태그, 버튼, 뱃지 (영문 전용) |
| 영문 데코 전용 | Cormorant Garamond 300 | 영문만 있는 인용구, 데코 텍스트 등 (선택적) |
| 코드/프롬프트 | DM Mono | 프롬프트 박스, 코드 블록 |

### 타입 스케일

| 용도 | 크기 | 폰트 | 특징 |
|---|---|---|---|
| Hero Title (영문) | `clamp(64px, 12vw, 160px)` | Cormorant Garamond 300 | 뷰포트 오버플로우, 하이라이트 마커 적용 |
| Hero Title (한글) | `clamp(40px, 7vw, 96px)` | Noto Sans KR 700 | — |
| Section Title | `clamp(32px, 5vw, 64px)` | Cormorant Garamond 400 | 영문 uppercase |
| Card Title | `15px` | Noto Sans KR 700 | uppercase (영문만) |
| Body (한글) | `15px` | Noto Sans KR 400 | line-height: 1.8 |
| Body (영문) | `14px` | Noto Sans KR 400 | line-height: 1.7 |
| 카테고리 / 뱃지 | `11px` | Playfair Display 700 | uppercase, letter-spacing: 0.08em |
| 버튼 텍스트 | `12px` | Playfair Display 700 | uppercase, letter-spacing: 0.1em |
| Prompt / Code | `12px` | DM Mono | color: `#ccc` on dark bg |

### 타이포그래피 원칙

- 영문 대제목은 Cormorant Garamond **라이트(300) 또는 레귤러(400)** — 볼드 금지
- 한국어는 Noto Sans KR — 세리프 폰트 한글 적용 금지
- Hero는 텍스트가 뷰포트를 **넘쳐흐르도록** 의도적으로 크게 (overflow: hidden 처리)
- 형광 하이라이트: `<span class="highlight">키워드</span>` → `background: #FFFF5B; padding: 0 6px`
- 카테고리/버튼의 Playfair Display는 **반드시 대문자** + letter-spacing
- `letter-spacing`: 버튼/태그 `0.08~0.15em`, 본문 기본값 유지

---

## 4. 레이아웃 시스템

### 그리드

```css
--grid-max-width: 1280px;
--grid-padding: clamp(16px, 5vw, 80px);  /* 좌우 여백 */
--grid-gap: 20px;
--grid-cols: 12;  /* 12컬럼 기반 */
```

### 섹션 패딩

```css
--section-padding-y: clamp(60px, 8vw, 120px);
```

### 레이아웃 패턴 (레퍼런스 기반)

**A. Hero 에디토리얼 그리드**  
- 왼쪽: 텍스트 블록 (Yellow/Primary bg) 4col  
- 오른쪽: 이미지 8col  
- 우측 사이드: Featured 리스트 2col (독립 컬럼)

**B. 카드 그리드 (4열)**  
```css
grid-template-columns: repeat(4, 1fr);
gap: 16px;
```
- 각 카드: 이미지 상단 + 태그 + 제목 + "READ MORE →"

**C. 와이드 배너 (풀 블리드)**  
- 이미지 100% width에 텍스트 오버레이  
- 최소 높이: `clamp(300px, 50vh, 600px)`

**D. 2단 스플릿**  
- 50 / 50 또는 40 / 60  
- 좌: 텍스트, 우: 이미지 (또는 역순)

---

## 5. 컴포넌트 스펙

### 5-1. Navigation

```
배경: --color-bg-main (베이지)
높이: 56px
로고: Serif 폰트, font-weight: 900
링크: Sans 11px uppercase, letter-spacing: 0.1em
position: sticky, top: 0
```

### 5-2. Category Filter Tags

```
스타일: pill shape (border-radius: 100px)
기본: border 1px solid #ccc, bg transparent
활성: bg --color-primary (#FFFF5B), border-color match
폰트: 11px, font-weight: 700, uppercase
패딩: 4px 14px
```

### 5-3. 카드 컴포넌트

```
bg: --color-white
border: none (그림자 대신 배경 대비로 구분)
border-radius: 6px
overflow: hidden
이미지: aspect-ratio 4/3, object-fit: cover
패딩: 12px 14px (텍스트 영역)
태그: 11px uppercase, color: --color-text-accent
제목: 14px, font-weight: 700, uppercase, color: --color-text-primary
"READ MORE →": 11px, font-weight: 700, margin-top: 8px
```

### 5-4. Primary Button

```
bg: --color-bg-dark (#1A1A1A)
color: #fff
font: 12px, font-weight: 700, uppercase, letter-spacing: 0.08em
padding: 12px 24px
border-radius: 4px
hover: bg #333
```

### 5-5. 섹션 태그 (eyebrow)

```
폰트: 11px, uppercase, letter-spacing: 0.12em
color: --color-text-accent (#C8914A)
margin-bottom: 8px
```

### 5-6. Dark 프롬프트 박스

```
bg: #1A1A1A
border-radius: 8px
padding: 20px 24px
label: 10px, color: #5AACF0, uppercase, letter-spacing: 0.1em
content: 13px mono, color: #ccc, line-height: 1.7
```

### 5-7. Before / After 슬라이더

```
container: position: relative, overflow: hidden
slider: input[type=range], position: absolute, z-index: 10
divider: 2px solid white, absolute
handle: 32px circle, bg white, shadow
```

---

## 6. 인터랙션 & 애니메이션

```css
/* 기본 트랜지션 */
--transition-base: 200ms ease;
--transition-slow: 400ms ease;

/* 카드 hover */
.card:hover img { transform: scale(1.03); transition: 400ms ease; }

/* 링크 hover */
a:hover { opacity: 0.7; }

/* Section 진입 애니메이션 */
/* IntersectionObserver → fadeInUp */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

---

## 7. 이미지 처리 원칙

- 모든 푸드 이미지: `object-fit: cover`, `object-position: center`
- 썸네일 비율: `4:3` (카드), `16:9` (와이드 배너), `1:1` (SNS 그리드)
- 이미지 위 텍스트: 반드시 Primary(#FFFF5B) 또는 Dark(#1A1A1A) 배경 오버레이 사용
- AI 생성 이미지 갤러리: `aspect-ratio: 1 / 1`, gap: 4px 타이트 그리드

---

## 8. 반응형 브레이크포인트

```css
--bp-mobile:  480px;
--bp-tablet:  768px;
--bp-desktop: 1024px;
--bp-wide:    1280px;
```

| 브레이크포인트 | 변경사항 |
|---|---|
| ≤ 768px | 카드 그리드 2열 → 1열, Hero 타이틀 축소 |
| ≤ 480px | 네비 링크 → 햄버거 메뉴, 섹션 패딩 축소 |

---

## 9. 페이지별 섹션 컬러 매핑

| 섹션 | 배경 | 포인트 |
|---|---|---|
| Nav | `--color-bg-main` | — |
| Hero | `--color-primary` (#FFFF5B) 풀블리드 또는 오프화이트 배경 | 블랙 대형 세리프 |
| Food AI | `--color-bg-main` (#F5F0E8) | 프롬프트 박스 다크 |
| Process | `#FFFFFF` | 스텝 넘버 라이트 |
| Brand Visual | `--color-bg-section` (#FFFDF8) | 피드 그리드 |
| 상세페이지 케이스 | `--color-bg-main` (#F2F2F0) | 카드 배경 화이트 |
| Vibe Coding | `#1A1A1A` 다크 | 텍스트 화이트 |
| About | `#FFFFFF` | — |
| Footer | `#1A1A1A` | — |

---

## 10. 금지 사항

- ❌ 그라디언트 배경 (플랫 컬러만)
- ❌ box-shadow 과도 사용 (카드 elevation 그림자 금지 — 배경 대비로 구분)
- ❌ 중간 크기 타이틀 (작으면 14px 이하, 크면 32px 이상 — 사이 크기 지양)
- ❌ Cormorant Garamond Bold/Black 사용 (라이트·레귤러 웨이트만)
- ❌ 한글에 세리프 폰트 적용 (Noto Sans KR 고정)
- ❌ 형광 옐로우 반투명 또는 그라디언트 처리
- ❌ 3개 이상 컬러 포인트 동시 사용
- ❌ 이미지 border-radius 10px 이상 (6px 최대)
- ❌ Playfair Display를 대형 제목에 사용 (소형 UI 전용)

---

## 11. 파일 구조 (GitHub Pages 기준)

```
portfolio/
├── index.html          # 메인 (싱글 페이지)
├── assets/
│   ├── images/         # AI 생성 이미지, 작업 스크린샷
│   └── fonts/          # (Google Fonts CDN 사용 시 불필요)
├── css/
│   └── style.css       # 이 MD 기반으로 작성
├── js/
│   └── main.js         # IntersectionObserver, 슬라이더
└── design-system.md    # 이 파일 (기준 문서)
```

---

*이 문서는 모든 코딩 작업의 기준입니다. 컬러, 폰트, 컴포넌트 추가 시 이 MD를 먼저 업데이트하고 반영합니다.*
