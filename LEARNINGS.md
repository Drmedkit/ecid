# ECID Content Presentation Layer - Development Learnings

This document captures learnings, decisions, and notes as we build the interactive course presentation system.

## Project Overview

Building an interactive learning experience for "Mental Performance in Esports" that transforms markdown content into:
- Video explanations (Remotion)
- Interactive diagrams (Mermaid)
- Progressive content display

## Architecture Decisions

### 1. Monorepo with Workspaces
**Decision**: Use npm workspaces to keep Remotion videos in `packages/videos`
**Rationale**: Shared types, simpler deployment, unified versioning

### 2. Mermaid for Diagrams
**Decision**: Client-side Mermaid rendering with dark theme
**Rationale**: Easy to embed in markdown, declarative syntax, React-friendly

### 3. Remotion for Videos
**Decision**: Separate Remotion workspace for video generation
**Rationale**: Can run `npm run videos:dev` to preview and iterate on videos

---

## Session 1: Foundation Setup

### What We Built
1. **Remotion workspace** (`packages/videos/`)
   - ModuleIntro composition for module intro videos
   - ECID brand colors integrated
   - Animation timings with spring physics

2. **Learn route** (`/learn`)
   - Course overview page with module grid
   - Individual module pages with content rendering
   - Mermaid diagram component

3. **Mermaid integration**
   - Dark theme matching ECID design
   - Automatic diagram detection in markdown
   - Error handling for invalid syntax

### Key Files Created
- `packages/videos/src/Root.tsx` - Remotion entry point
- `packages/videos/src/compositions/ModuleIntro.tsx` - Module intro video
- `app/learn/page.tsx` - Course landing page
- `app/learn/[moduleId]/page.tsx` - Module detail page
- `components/learn/mermaid-diagram.tsx` - Mermaid renderer

### Mermaid Syntax Reference

To add a diagram to content, use:
\`\`\`mermaid
flowchart TD
    A[Start] --> B[Process]
    B --> C[End]
\`\`\`

### ECID Brand Colors
- Primary: `#0EF0EB` (Cyan/Teal)
- Secondary: `#F6F400` (Yellow)
- Background: `#0a0a0a`
- Text: `#ffffff`

---

## Module Content with Diagrams

### Module 1: Foundation of Performance
Key diagrams to create:
- Performance Model (mental, physical, tactical, technical)
- Choking Under Pressure flowchart

### Module 2: Dealing with Performance Pressure
Key diagrams to create:
- Stress response cycle
- Breathing technique steps

### Module 3: Managing Thoughts
Key diagrams to create:
- Negative thinking cycle
- Attribution matrix (internal/external, stable/unstable)

### Module 4: Attention and Focus
Key diagrams to create:
- Attention dimensions quadrant
- Refocusing process

### Module 5: Control the Controllables
Key diagrams to create:
- Controllable vs Uncontrollable factors

### Module 6: Mindset
Key diagrams to create:
- Fixed vs Growth mindset comparison
- Mindset continuum

### Module 7: Team Dynamics
Key diagrams to create:
- Team culture pyramid
- Communication flow

---

## Commands Reference

```bash
# Start main app
npm run dev

# Start Remotion studio (video preview)
npm run videos:dev

# Build videos
npm run videos:build

# Docker
docker compose up -d
docker compose down
docker compose build --no-cache
```

---

## Next Steps
- [ ] Add Performance Model diagram to Module 1
- [ ] Test Mermaid rendering in browser
- [ ] Create video for Module 1 intro
- [ ] Render and embed video in learn page
