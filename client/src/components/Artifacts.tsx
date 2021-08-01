import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledArtifacts = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

interface ArtifactProps {
	artifact: Artifact;
}

const Traingle = styled.div`
	position: absolute;
	width: 0;
	height: 0;
	/* border-left: ${(props: ArtifactProps) => props.artifact.distance * 50 + 'px'} solid transparent;
	border-right: ${(props: ArtifactProps) => props.artifact.distance * 50 + 'px'} solid transparent;
	border-bottom: ${(props: ArtifactProps) => props.artifact.distance * 50 + 'px'} solid ${(props: ArtifactProps) => props.artifact.color}; */
	height: ${(props: ArtifactProps) => props.artifact.distance * 100 + 50 + 'px'};
	width: ${(props: ArtifactProps) => props.artifact.distance * 100 + 50 + 'px'};
	top: ${(props: ArtifactProps) => props.artifact.height + 'vh'};
	left: ${(props: ArtifactProps) => props.artifact.width + 'vw'};
	/* filter: blur(${(props: ArtifactProps) => (1 - props.artifact.distance) * 20 + 'px'}) brightness(1.2) saturate(1.2); */

	background: rgba(255, 255, 255, 0.25);
	box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
	backdrop-filter: blur(4px);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.18);
	transform: rotate(-5deg);
`;

interface Artifact {
	distance: number;
	color: string;
	height: number;
	width: number;
}

const Artifacts = () => {
	const [artifacts, setArtifacts] = useState<Artifact[]>([]);

	const getColor = (seed: number) => {
		if (seed < 0.2) return 'var(--bg-01)';
		if (seed < 0.4) return 'var(--bg-02)';
		if (seed < 0.6) return 'var(--bg-03)';
		if (seed < 0.8) return 'var(--bg-04)';
		return 'var(--bg-05)';
	};

	useEffect(() => {
		const _artifacts: Artifact[] = [];
		for (let index = 0; index < 20; index++) {
			_artifacts.push({
				distance: Math.random(),
				color: getColor(Math.random()),
				height: Math.round(Math.random() * 100),
				width: Math.round(Math.random() * 100)
			});
			setArtifacts(_artifacts);
		}
	}, []);

	return (
		<StyledArtifacts>
			{artifacts
				.sort((a: Artifact, b: Artifact) => a.distance - b.distance)
				.map((artifact: Artifact) => (
					<Traingle artifact={artifact} />
				))}
		</StyledArtifacts>
	);
};

export default Artifacts;
