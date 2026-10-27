/** A consistent set of restrained, 24px line icons. */
export function ServiceIcon({
  kind,
}: {
  kind: "code" | "consult" | "transform" | "integration" | "data" | "security"
}) {
  const paths = {
    code: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <path d="M3 9h18M8 13l-2 2 2 2m8-4 2 2-2 2m-3-5-2 6" />
      </>
    ),
    consult: (
      <>
        <path d="M8 10h8m-8 4h5M7 20l-3 1V6a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H7Z" />
      </>
    ),
    transform: (
      <>
        <path d="M20 8a8 8 0 0 0-14-3L3 8m0-5v5h5M4 16a8 8 0 0 0 14 3l3-3m-5 0h5v5" />
      </>
    ),
    integration: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
        <path d="M14 6h3a1 1 0 0 1 1 1v3M6 14v3a1 1 0 0 0 1 1h3" />
      </>
    ),
    data: (
      <>
        <path d="M4 3v15a2 2 0 0 0 2 2h15M8 15v-3m5 3V8m5 7V5" />
      </>
    ),
    security: (
      <>
        <path d="m12 3 8 3v6c0 4-3 7-8 9-5-2-8-5-8-9V6l8-3Z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
  }
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.65"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      {paths[kind]}
    </svg>
  )
}
