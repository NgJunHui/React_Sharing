import { BrandIcon } from "../components/brandIcons";
import { CodeBlock } from "../components/CodeBlock";
import {
  Body,
  CardText,
  Grid,
  InfoCard,
  Lede,
} from "../components/primitives";

export function LanguagesSection() {
  return (
    <>
      <Lede>
        Every web page is built from three languages. They are separate concerns
        with separate jobs, and everything else in this session sits on top of
        them.
      </Lede>

      <Grid cols={3}>
        <InfoCard
          icon={<BrandIcon name="html" />}
          title="HTML"
          tag="Structure"
          tagTone="html"
          tagBelowTitle
        >
          <CardText>
            The content and its meaning. Headings, paragraphs, inputs, buttons.
            No styling, no behaviour.
          </CardText>
        </InfoCard>
        <InfoCard
          icon={<BrandIcon name="css" />}
          title="CSS"
          tag="Presentation"
          tagTone="css"
          tagBelowTitle
        >
          <CardText>
            How it looks. Colour, spacing, size, position, responsiveness.
            Selects elements and applies rules.
          </CardText>
        </InfoCard>
        <InfoCard
          icon={<BrandIcon name="javascript" />}
          title="JavaScript"
          tag="Behaviour"
          tagTone="javascript"
          tagBelowTitle
        >
          <CardText>
            What happens. Responds to clicks, updates content, talks to APIs. The
            only one of the three that is a programming language.
          </CardText>
        </InfoCard>
      </Grid>

      <Body>
        The same button, expressed in all three. Each layer is independent, and
        each can be changed without touching the others.
      </Body>

      <CodeBlock>{`<!-- HTML: what it is -->
<button id="save" class="btn">Save</button>

/* CSS: how it looks */
.btn {
  background: #141B4D;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
}

// JavaScript: what it does
document.getElementById('save').addEventListener('click', () => {
  saveForm();
});`}</CodeBlock>
    </>
  );
}
