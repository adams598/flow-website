/** Avatars illustrés « mignons » — même touche que la plateforme de Zineb (Néom). */
export function avatarUrl(agentId: string, size = 128): string {
  const params = new URLSearchParams({
    seed: `flow-${agentId}`,
    backgroundColor: '1c1b1b',
    radius: '50',
    size: String(size),
  })
  return `https://api.dicebear.com/9.x/adventurer/svg?${params.toString()}`
}
